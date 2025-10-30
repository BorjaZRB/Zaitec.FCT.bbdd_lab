import { Routes } from '@angular/router';

export const routes: Routes = [
  // ... (aquí las rutas)

  // RUTA PARA LA INTERFAZ HOME (AUTH-004)
  {
    path: 'home',
    loadComponent: () =>
    import('./features/home/pages/home/home.component').then(
      (m) => m.HomeComponent // Uso estándar recomendado
    ),
  },

  // Para que la raíz redirija a home (se puede borrar luego si eso)
  {
     path: '',
     redirectTo: 'home',
     pathMatch: 'full',
  },

  // ... (Continuar con otras rutas)
];