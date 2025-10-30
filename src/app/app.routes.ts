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
}


];
