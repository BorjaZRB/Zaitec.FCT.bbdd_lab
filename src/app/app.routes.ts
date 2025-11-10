/*Importaciones combinadas de DEV y EP-02 
(incluyendo los componentes de citas)*/
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login.component';
import { CitasCalendarioComponent } from './features/citas/pages/calendario/citas-calendar/citas-calendario';
import { CitasComponent } from './features/citas/pages/citas/citas.component';
import { CitasListPage } from './features/citas/pages/list/citas-list.page';
import { DashboardComponent } from './features/dashboard/pages/Dashboard.component/Dashboard.component';
import { ResultadosAnalisis } from './features/resultados-analisis/resultados-analisis';

export const routes: Routes = [
{
  // Ruta para el componente de login
  path: '',
  component:LoginComponent,
},{
path: 'dashboard',
  component: DashboardComponent
},
{

  path: 'Login',
  component:LoginComponent,
  title:'Inicio'
},
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



  // --- RUTAS DE FEATURE (EP-02) ---
  {
    /*Aquí había un conflicto porque para EP-02 se usaba carga 
    perezosa (loadComponent), que es la forma moderna de Angular 
    Standalone, mientras que DEV usa carga estática (component:), 
    que es más tradicional (y puede ser más simple para componentes 
    pequeños). Al fusionar los dos archivos, he querido mantener
    la estructura de rutas de dev (que incluye calendario y 
    resultados-analisis), asegurando que HomeComponent y Pacientes 
    se integren correctamente, manteniendo preferencia por la Carga 
    Perezosa (loadComponent) cuando sea posible.*/
    path: 'home', // Dashboard (Usamos Carga Perezosa - loadComponent)
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  }, 
  {
    path: 'pacientes', // Gestión de Pacientes (Usamos Carga Perezosa)
    loadComponent: () =>
      import('./features/patients/pages/list/list.component').then(
        (m) => m.ListComponent
      ),
  },

  // --- RUTA DE FALLBACK ---
  { path: '**', redirectTo: '', pathMatch: 'full' },
];