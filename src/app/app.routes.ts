/* Importaciones combinadas de DEV y EP-02 */
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login.component';
import { CitasCalendarioComponent } from './features/citas/pages/calendario/citas-calendar/citas-calendario';
// NOTA: Se elimina la importación de CitasComponent, no se usa en las rutas
import { CitasListPage } from './features/citas/pages/list/citas-list.page';
import { DashboardComponent } from './features/dashboard/pages/Dashboard.component/Dashboard.component';
import { ResultadosAnalisis } from './features/resultados-analisis/resultados-analisis';

export const routes: Routes = [
{
  // 1. RUTA PRINCIPAL (RAÍZ): el Login.
  path: '',
  component:LoginComponent,
  pathMatch: 'full'
},
{
  // 2. RUTA DASHBOARD
  path: 'dashboard',
  component: DashboardComponent,
  title: 'Dashboard'
},
{
  // 3. RUTA EXPLÍCITA DE LOGIN
  path: 'Login',
  component:LoginComponent,
  title:'Inicio'
},

// --- RUTAS DE DEV ---
{
  path: 'citas',
  component: CitasListPage,
  title: 'Citas'
},
{
  path: 'calendario',
  component: CitasCalendarioComponent,
  title: 'Calendario de Citas'
},
{
  path: 'resultados-analisis',
  component:ResultadosAnalisis,
  title: 'Resultados de Análisis',
},

{
  // Ruta para el registro de empleados
  path: 'registro-empleado',
  loadComponent: () => import('./features/registroEmpleados/registroEmpleado.component').then(m => m.RegistroEmpleado),
  title: 'Registro Empleado'
},

// --- RUTA CORREGIDA DE PACIENTES ---
{
  //Usamos la carga perezosa (loadComponent).
  path: 'pacientes',
  loadComponent: () =>
    import('./features/patients/pages/list/list.component').then(
      (m) => m.ListComponent
    ),
},

// --- RUTA DE FALLBACK ---
{ path: '**', redirectTo: '', pathMatch: 'full' },
];
