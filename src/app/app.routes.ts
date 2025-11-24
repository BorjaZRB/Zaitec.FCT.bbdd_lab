/* Importaciones combinadas de DEV y EP-02 */
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login.component';
import { RecoverComponent } from './features/auth/recover/recover.component';
import { CitasCalendarioComponent } from './features/citas/pages/calendario/citas-calendar/citas-calendario';
// NOTA: Se elimina la importación de CitasComponent, no se usa en las rutas
import { CitasListPage } from './features/citas/pages/list/citas-list.page';
import { DashboardComponent } from './features/dashboard/pages/Dashboard.component/Dashboard.component';
import { ResultadosAnalisis } from './features/resultados-analisis/resultados-analisis';
import { ProfileComponent } from './features/profile/profile.component';
import { roleGuard } from './core/guards/role-guard'; // <-- Importar el guard

export const routes: Routes = [
  // 1. RUTA PRINCIPAL (RAÍZ): el Login.
  { path: '', component: LoginComponent, pathMatch: 'full' },

  // Recuperar contraseña
  { path: 'recover', component: RecoverComponent, title: 'Recuperar contraseña' },
  {
    path: 'reset',
    loadComponent: () => import('./features/auth/reset/reset.component').then(m => m.ResetComponent),
    title: 'Restablecer contraseña',
  },

  // 2. RUTA DASHBOARD
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard', canActivate: [roleGuard], data: { roles: ['administrador', 'coordinador', 'trabajador'] } },

  // 3. RUTA EXPLÍCITA DE LOGIN
  { path: 'Login', component: LoginComponent, title: 'Inicio' },

  // --- RUTAS PRINCIPALES ---
  { path: 'citas', component: CitasListPage, title: 'Citas' },
  { path: 'calendario', component: CitasCalendarioComponent, title: 'Calendario de Citas' },
  { path: 'resultados-analisis', component: ResultadosAnalisis, title: 'Resultados de Análisis', canActivate: [roleGuard], data: { roles: ['administrador', 'coordinador', 'trabajador', 'cliente'] } },

  // Ruta para el registro de empleados (lazy)
  { path: 'registro-empleado', loadComponent: () => import('./features/registroEmpleados/registroEmpleado.component').then(m => m.RegistroEmpleado), title: 'Registro Empleado' },

  // Ruta de pacientes (lazy + guard)
  { path: 'pacientes', canActivate: [roleGuard], data: { roles: ['administrador', 'coordinador', 'trabajador'] }, loadComponent: () => import('./features/patients/pages/list/list.component').then(m => m.ListComponent) },

  // Perfil de usuario
  { path: 'profile', component: ProfileComponent, title: 'Perfil' },

  // --- RUTA DE FALLBACK ---
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
