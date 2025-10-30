import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login';

export const routes: Routes = [
{
  // Ruta para el componente de login
  path: '',
  component:LoginComponent,
}, {
  path: 'citas',
  loadChildren: () =>
    import('./features/citas/routes').then(m => m.CITAS_ROUTES)
},
// RUTAS AUTH-004 
{
  path: 'home',
  loadComponent: () =>
    import('./features/home/pages/home/home.component').then(
      (m) => m.HomeComponent
    ),
}, {
  path: 'citas',
  loadComponent: () =>
    import('./features/citas/pages/citas/citas.component').then(
      (m) => m.CitasComponent
    ),
},
  // ...
];


