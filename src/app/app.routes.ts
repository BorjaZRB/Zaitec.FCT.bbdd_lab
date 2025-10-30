import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login';
import { CitasService } from './features/citas/data/citas.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers (router, animations, http, etc.)
    
    CitasService, // <<-- REGISTRO DEL SERVICIO AQUÍ
  ]
};
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
},
  // ...
];


