import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- MÓDULOS DE MATERIAL NECESARIOS ---
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 

// Importación del servicio y los tipos
import { PatientsService } from '../../data/patients.service'; 
import { Patient } from '../../data/patients.types';
import { FormDialogComponent } from '../../components/form-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true, 
  imports: [
    CommonModule,
    MatDialogModule, 
    // --- ¡MÓDULOS REQUERIDOS POR EL TEMPLATE! ---
    MatTableModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule
    // ---------------------------------------------
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'], 
})
export class ListComponent {
  
  // Definimos las columnas que se mostrarán en la tabla
  displayedColumns: string[] = [
    'id', 
    'identificationCode', 
    'type', 
    'name', 
    'birthdate', 
    'actions'
  ];

  dataSource: Patient[] = [];

  // Inyección de dependencias
  constructor(
    private patientsService: PatientsService, 
    public dialog: MatDialog
  ) {
    this.dataSource = this.patientsService.listPatients();
  }

  // Método para abrir el modal:
  openNewPatientDialog() {
    this.dialog.open(FormDialogComponent, { 
      width: '600px', 
      data: { isEdit: false } 
    });
  }

  // Modificación del método de edición para abrir el modal con datos:
  editPatient(patient: Patient) {
    this.dialog.open(FormDialogComponent, { 
      width: '600px',
      data: { isEdit: true, patient: patient } 
    });
  }
  
}