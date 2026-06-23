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
    // Enter no campo usuário foca a senha — o navegador cuida disso via tab-order,
    // mas se o usuário der Enter no campo usuário, apenas move o foco para senha.
    const passwordEl = document.getElementById('password');
    passwordEl?.focus();
  }

  signin(): void {
    if (!this.canSubmit()) return;

    this.loading.set(true);
    this.errorMsg.set('');

    this.authService.signin(this.username.trim(), this.password).subscribe({
      next: () => {
        this.router.navigate(['/listagem']);
      },
      error: err => {
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
