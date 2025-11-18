import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// Definición de roles 
export type UserRole = 'administrador' | 'coordinador' | 'trabajador' | 'cliente' | 'invitado';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
  constructor(private router: Router) { }

  // CAMBIO TEMPORAL SOLO PARA DEBUGGING
  private getRoleFromLocalStorage(): UserRole {
    const userStr = localStorage.getItem('usuario');
    // Si el usuario está en localStorage, asumiremos temporalmente que es ADMINISTRADOR
    if (userStr) {
      return 'administrador'; // <--- CAMBIO TEMPORAL
    }
    return 'invitado'; 
  }

  /* LOGICA ORIGINAL PARA CUANDO SE TERMINEN LAS PRUEBAS:
  private getRoleFromLocalStorage(): UserRole {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Asumimos que el objeto 'usuario' guardado por AuthService tiene un campo 'rol'
        const role = user.rol?.toLowerCase(); 
        
        if (['administrador', 'coordinador', 'trabajador', 'cliente'].includes(role)) {
            return role as UserRole;
        }
      } catch (e) {
        console.error("Error al parsear usuario de localStorage:", e);
      }
    }
    return 'invitado'; // Si no hay datos, el rol es 'invitado'
  }*/

  public isLoggedIn(): boolean {
    return this.getRoleFromLocalStorage() !== 'invitado';
  }
  
  public getCurrentUserRole(): UserRole {
    return this.getRoleFromLocalStorage();
  }

  /**
   * Verifica si el usuario actual tiene alguno de los roles requeridos, y gestiona la redirección del cliente.
   */
  public hasRequiredRole(requiredRoles: UserRole[]): Observable<boolean> {
    const currentRole = this.getCurrentUserRole();
    
    // 1. REGLA CRUCIAL: Si el usuario es un CLIENTE, no debe acceder a las rutas de gestión.
    if (currentRole === 'cliente') {
        // Redirige a la vista de resultados (la ruta de acceso de los clientes).
        this.router.navigate(['/resultados-analisis']); 
        return of(false);
    }
    
    // 2. Verificar si el rol de gestión tiene acceso
    if (requiredRoles.includes(currentRole)) {
      return of(true); // Permiso concedido
    } else {
      // Acceso denegado, redirige al Dashboard (ruta segura)
      console.warn(`Acceso denegado. Rol actual: ${currentRole}`);
      this.router.navigate(['/dashboard']); 
      return of(false);
    }
  }
}