import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard funcional (Angular 15+).
 * Redireciona para /login se o usuário não estiver autenticado.
 *
 * IMPORTANTE: no servidor (SSR) não existe localStorage, então não há como
 * saber se o usuário está autenticado. Nesse caso o guard deixa passar sem
 * julgar — a decisão real só é tomada no browser, após a hidratação, quando
 * o AuthService consegue de fato ler o token salvo.
 */
export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
