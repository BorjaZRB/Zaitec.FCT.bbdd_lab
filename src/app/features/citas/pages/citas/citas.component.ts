import { Component } from '@angular/core';
import { CitasListPage } from "../list/citas-list.page";
import { Cita } from '../../types';

@Component({
  selector: 'app-citas',
  imports: [CitasListPage],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss',
})
export class CitasComponent {


}
