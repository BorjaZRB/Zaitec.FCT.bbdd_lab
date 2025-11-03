import { Routes } from '@angular/router';
// Importación corregida a la convención estándar (.component):
import { LoginComponent } from './features/auth/login/login/login.component'; 

export const routes: Routes = [
  
  // 1. RUTA DE INICIO: Cargamos el LoginComponent
  {
    path: '',
    component: LoginComponent, // <-- Usa la importación estática
    pathMatch: 'full' 
  },
  
  // 2. RUTA DE HOME (Dashboard)
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  }, 
  
  // 3. Ruta de citas
  {
    path: 'citas',
    loadChildren: () =>
      import('./features/citas/routes').then(m => m.CITAS_ROUTES)
  },

  // 4. RUTA DE FALLBACK (Si la URL no coincide con nada, regresa al Login)
  { path: '**', redirectTo: '', pathMatch: 'full' },
];