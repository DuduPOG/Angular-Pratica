import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

/**
 * Interceptor funcional (Angular 15+).
 *
 * Responsabilidades:
 * 1. Anexa `Authorization: Bearer <token>` em toda requisição direcionada
 *    à apiUrl configurada no environment.
 * 2. Trata respostas 401: limpa sessão e redireciona para /login.
 *
 * Requisições para URLs externas (ex.: CDN de imagens) passam sem modificação.
 */
export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const isApiRequest = req.url.startsWith(environment.apiUrl);

  if (!isApiRequest) {
    return next(req);
  }

  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.authenticatedToken();

  const authorizedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authorizedReq).pipe(
    catchError(error => {
      if (error?.status === 401) {
        auth.clearSession();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
}
