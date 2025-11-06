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




];
