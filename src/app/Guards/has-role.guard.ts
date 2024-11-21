import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth-service.service';
import { map } from 'rxjs';

export const hasRoleGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRoles = authService.getRoles();
  const requiredRoles = route.data?.['allowedRoles'] as string[];

  // Verificar si el usuario tiene los roles necesarios
  const hasRequiredRoles = requiredRoles.every((role) =>
    userRoles.includes(role)
  );

  if (hasRequiredRoles) {
    // Usuario tiene los roles necesarios
    return true;
  } else {
    // Usuario no tiene los roles necesarios, redirigir o manejar de acuerdo a tus necesidades
    // return router.createUrlTree(['/unauthorized']); // Redirige a una página de acceso no autorizado
    // return router.createUrlTree(['/login']); // Redirige a una página de acceso no autorizado
    return false; // No permite el acceso
  }
};
