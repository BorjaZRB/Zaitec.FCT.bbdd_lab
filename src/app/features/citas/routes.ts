import { Routes } from '@angular/router';
import { CitasListPage } from './pages/list/citas-list.page';
import { CitasDetailPage } from './pages/detail/citas-detail.page';

export const CITAS_ROUTES: Routes = [
  { path: '', component: CitasListPage, title: 'Citas' },          // /citas
  { path: ':id', component: CitasDetailPage, title: 'Detalle' },   // /citas/apt-1
];
