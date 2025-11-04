import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsService } from '../../data/patients.service'; 
import { Patient } from '../../data/patients.types';

@Component({
  selector: 'app-list',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'], 
})
export class ListComponent {
  // Definimos las columnas que se mostrarán en la tabla
  // Añadimos 'type' (Humano/Animal) y combinamos la identificación.
  displayedColumns: string[] = [
    'id', 
    'identificationCode', 
    'type', 
    'name', 
    'birthdate', 
    'actions'
  ];

  dataSource: Patient[] = [];

  constructor(private patientsService: PatientsService) {
      this.dataSource = this.patientsService.listPatients();
  }
}