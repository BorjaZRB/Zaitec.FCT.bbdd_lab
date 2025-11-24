import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login.component';
import { RecoverComponent } from './features/auth/recover/recover.component';
import { CitasCalendarioComponent } from './features/citas/pages/calendario/citas-calendar/citas-calendario';
import { CitasComponent } from './features/citas/pages/citas/citas.component';
import { CitasListPage } from './features/citas/pages/list/citas-list.page';
import { DashboardComponent } from './features/dashboard/pages/Dashboard.component/Dashboard.component';
import { ResultadosAnalisis } from './features/resultados-analisis/resultados-analisis';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  // Ruta raíz -> Login
  { path: '', component: LoginComponent },

  // Recuperar contraseña
  { path: 'recover', component: RecoverComponent, title: 'Recuperar contraseña' },
  {
    path: 'reset',
    loadComponent: () => import('./features/auth/reset/reset.component').then(m => m.ResetComponent),
    title: 'Restablecer contraseña',
  },

  // Dashboard y otras rutas
  { path: 'dashboard', component: DashboardComponent },
  { path: 'Login', component: LoginComponent, title: 'Inicio' },
  { path: 'citas', component: CitasListPage, title: 'Citas' },
  { path: 'calendario', component: CitasCalendarioComponent, title: 'Calendario de Citas' },
  { path: 'resultados-analisis', component: ResultadosAnalisis, title: 'Resultados de Análisis' },
  { path: 'profile', component: ProfileComponent, title: 'Perfil' },
];
