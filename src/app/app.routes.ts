import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login';
import { CitasCalendarioComponent } from './features/citas/pages/calendario/citas-calendar/citas-calendario';
import { CitasComponent } from './features/citas/pages/citas/citas.component';

export const routes: Routes = [
{
  // Ruta para el componente de login
  path: '',
  component:LoginComponent,
},
{

  path: 'Login',
  component:LoginComponent,
  title:'Inicio'
},


{
  path: 'citas',
  component:CitasComponent,
  title: 'Citas'
},
{ path: 'calendario',
  component: CitasCalendarioComponent,
  title: 'Calendario de Citas'
},




];
