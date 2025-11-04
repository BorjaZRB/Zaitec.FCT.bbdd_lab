import { Routes } from '@angular/router';
// Importación de los componentes
import { LoginComponent } from './features/auth/login/login/login.component'; 

export const routes: Routes = [
  
  // 1. RUTA DE INICIO (Login)
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  
  // 2. RUTA HOME (Dashboard)
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  }, 
  
  // 3. RUTA DE CITAS
  {
    path: 'citas',
    loadComponent: () =>
      import('./features/citas/pages/citas/citas.component').then(
        (m) => m.CitasComponent
      ),
  },

  // 4. RUTA GESTIÓN DE PACIENTES 
  {
    path: 'pacientes',
    loadComponent: () =>
      import('./features/patients/pages/list/list.component').then(
        (m) => m.ListComponent
      ),
  },

  // 5. RUTA DE FALLBACK
  { path: '**', redirectTo: '', pathMatch: 'full' },
];