import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth-service.service';

export const IsloggedInGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const result = authService.VerificarUsuarioYRedirigir();

  if (result instanceof UrlTree) {
    return result; // Redirige al usuario a la página de dashboard
  } else {
    return result; // false (no autenticado)
  }
};
