import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

const AUTH_ENDPOINTS = ['/token/', '/token/refresh/'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const isAuthEndpoint = AUTH_ENDPOINTS.some(path => req.url.endsWith(path));

  if (isAuthEndpoint) {
    return next(req);
  }

  const auth = inject(AuthService);
  const token = auth.getToken();

  if(token){
    req = req.clone({
    setHeaders: {
    Authorization:`Bearer ${token}`
    }});
  }
  return next(req);
};
