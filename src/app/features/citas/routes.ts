import { Routes } from '@angular/router';
import { CitasListPage } from './pages/list/citas-list.page';
import { CitasDetailPage } from './pages/detail/citas-detail.page';
import { CitasCalendarioComponent } from './pages/calendario/citas-calendar/citas-calendario';
export const CITAS_ROUTES: Routes = [

  { path: '', component: CitasListPage, title: 'Citas' }, // /citas

  { path: ':id', component: CitasDetailPage, title: 'Detalle de la cita' },   // /citas/apt-1
  
  { path: 'calendario', component: CitasCalendarioComponent, title: 'Calendario de Citas' }, // /citas/calendario
];
