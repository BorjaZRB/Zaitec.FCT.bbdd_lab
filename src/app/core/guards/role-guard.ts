import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityService, UserRole } from '../services/security.service';
import { map } from 'rxjs';

/**
 * Role Guard: Verifica si el usuario está autenticado y si tiene los roles necesarios.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const securityService = inject(SecurityService);
  
  const requiredRoles: UserRole[] = route.data['roles'];

  // 1. Verificar autenticación (Si no está logueado, redirige al Login)
  if (!securityService.isLoggedIn()) {
    router.navigate(['/']); 
    return false;
  }

  // 2. Verificar roles (La lógica de SecurityService maneja la redirección del cliente)
  return securityService.hasRequiredRole(requiredRoles).pipe(
    // El SecurityService devuelve un Observable<boolean>, lo pasamos directamente
    map(allowed => {
      // Si no está permitido, el SecurityService ya redirigió
      return allowed;
    })
  );
};