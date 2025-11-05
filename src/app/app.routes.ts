import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login';
import { CitasCalendarioComponent } from './features/citas/pages/calendario/citas-calendar/citas-calendario';
import { CitasComponent } from './features/citas/pages/citas/citas.component';
import { ResultadosAnalisis } from './features/resultados-analisis/resultados-analisis';

export const routes: Routes = [
  {
    // Ruta por defecto → login
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Inicio',
  },
  {
    path: 'citas',
    component: CitasComponent,
    title: 'Citas',
  },
  {
    path: 'calendario',
    component: CitasCalendarioComponent,
    title: 'Calendario de Citas',
  },
  {
    path: 'resultados-analisis',
    component: ResultadosAnalisis,
    title: 'Resultados de Análisis',
  },
];
