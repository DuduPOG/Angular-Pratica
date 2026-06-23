import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

/** Resposta bruta do djangorestframework-simplejwt (TokenObtainPairView) */
export interface JwtTokenPair {
  access: string;
  refresh: string;
}

const STORAGE_KEY = 'crud_jwt_access';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenUrl = `${environment.apiUrl}/auth/token/`;

  private accessToken: string | null = null;
  private expiresAt: number | null = null;  // ms timestamp

  constructor() {
    // Restaura token persistido no localStorage ao inicializar
    this.hydrate();
  }

  // ── Autenticação ───────────────────────────────────────────────────────────

  signin(username: string, password: string): Observable<JwtTokenPair> {
    return this.http
      .post<JwtTokenPair>(this.tokenUrl, { username, password })
      .pipe(tap(pair => this.storeToken(pair.access)));
  }

  logout(): void {
    this.clearSession();
  }

  // ── Consultas de estado ───────────────────────────────────────────────────

  isAuthenticated(): boolean {
    if (!this.accessToken) return false;
    if (this.expiresAt && this.expiresAt <= Date.now()) {
      this.clearSession();
      return false;
    }
    return true;
  }

  authenticatedToken(): string | null {
    return this.accessToken;
  }

  // ── Sessão ────────────────────────────────────────────────────────────────

  clearSession(): void {
    this.accessToken = null;
    this.expiresAt = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  // ── Internos ──────────────────────────────────────────────────────────────

  private storeToken(token: string): void {
    this.accessToken = token;
    this.expiresAt = this.extractExp(token);
    // Persiste somente o access token (stateless — refresh é opcional aqui)
    localStorage.setItem(STORAGE_KEY, token);
  }

  private hydrate(): void {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return;

    const exp = this.extractExp(token);
    if (exp && exp <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    this.accessToken = token;
    this.expiresAt = exp;
  }

  /**
   * Decodifica o payload do JWT (base64url) para extrair o campo `exp`.
   * Retorna timestamp em ms ou null se o campo não existir / decode falhar.
   * Não valida a assinatura — apenas lê o claim público.
   */
  private extractExp(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }
}
