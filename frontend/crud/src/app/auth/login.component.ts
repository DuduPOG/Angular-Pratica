import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <p-toast />

    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-10">

        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <i class="pi pi-lock text-3xl text-blue-600"></i>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 22C5.45 22 4.97933 21.8043 4.588 21.413C4.19667 21.0217 4.00067 20.5507 4 20V10C4 9.45 4.196 8.97933 4.588 8.588C4.98 8.19667 5.45067 8.00067 6 8H7V6C7 4.61667 7.48767 3.43767 8.463 2.463C9.43833 1.48833 10.6173 1.00067 12 1C13.3827 0.999334 14.562 1.487 15.538 2.463C16.514 3.439 17.0013 4.618 17 6V8H18C18.55 8 19.021 8.196 19.413 8.588C19.805 8.98 20.0007 9.45067 20 10V20C20 20.55 19.8043 21.021 19.413 21.413C19.0217 21.805 18.5507 22.0007 18 22H6ZM13.413 16.413C13.8043 16.021 14 15.55 14 15C14 14.45 13.8043 13.9793 13.413 13.588C13.0217 13.1967 12.5507 13.0007 12 13C11.4493 12.9993 10.9787 13.1953 10.588 13.588C10.1973 13.9807 10.0013 14.4513 10 15C9.99867 15.5487 10.1947 16.0197 10.588 16.413C10.9813 16.8063 11.452 17.002 12 17C12.548 16.998 13.019 16.8023 13.413 16.413ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z" fill="black"/>
</svg>

          </div>
          <h1 class="text-2xl font-bold text-gray-800">CRUD — Acesso</h1>
          <p class="text-gray-500 text-sm mt-1">Informe suas credenciais para continuar</p>
        </div>

        <!-- Formulário -->
        <div class="space-y-6">
          <!-- Usuário -->
          <p-floatlabel variant="on" class="w-full">
            <input
              id="username"
              type="text"
              pInputText
              class="w-full"
              [(ngModel)]="username"
              autocomplete="username"
              (keydown.enter)="handleEnter()"
            />
            <label for="username">Usuário</label>
          </p-floatlabel>

          <!-- Senha -->
          <p-floatlabel variant="on" class="w-full">
            <p-password
              inputId="password"
              class="w-full"
              [(ngModel)]="password"
              [feedback]="false"
              [toggleMask]="true"
              autocomplete="current-password"
              (keydown.enter)="signin()"
            />
            <label for="password">Senha</label>
          </p-floatlabel>

          <!-- Botão -->
          <p-button
            label="Entrar"
            icon="pi pi-sign-in"
            [loading]="loading()"
            [disabled]="!canSubmit()"
            (onClick)="signin()"
            styleClass="w-full"
          />

          @if (errorMsg()) {
            <p class="text-red-600 text-sm text-center">{{ errorMsg() }}</p>
          }
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  username = '';
  password = '';
  loading = signal(false);
  errorMsg = signal('');

  canSubmit(): boolean {
    return this.username.trim().length > 0 && this.password.length >= 3;
  }

  handleEnter(): void {
    const passwordEl = document.getElementById('password');
    passwordEl?.focus();
  }

  signin(): void {
    if (!this.canSubmit()) return;

    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.login({username: this.username, password: this.password}).subscribe({
      next: (response: any) => {
        this.authService.saveTokens(response);
        this.router.navigate(['/listagem']);
      },
      error: (err: any) => {
        this.loading.set(false);
        const status = err?.status;
        if (status === 401 || status === 400) {
          this.errorMsg.set('Usuário ou senha inválidos.');
        } else {
          this.errorMsg.set('Erro ao conectar com o servidor. Tente novamente.');
        }
      },
    });
  }
}
