import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- MÓDULOS DE MATERIAL NECESARIOS ---
import { MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { FormsModule } from '@angular/forms'; // Para usar el [(ngModel)]
import { MatSelectModule } from '@angular/material/select'; // Para el selector

// Importación del servicio y los tipos
import { PatientsService } from '../../data/patients.service'; 
import { Patient } from '../../data/patients.types';
import { FormDialogComponent } from '../../components/form-dialog.component';

@Component({
  selector: 'app-list',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule, 
    MatSelectModule,
    MatTableModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule
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

  // PROPIEDADES PARA EL FILTRADO
  public filterType: string = 'todos'; // Valor inicial del filtro
  public readonly filterOptions = [ // Opciones para el selector
    { value: 'todos', viewValue: 'Todos los Pacientes' },
    { value: 'humano', viewValue: 'Humanos (NUHSA)' },
    { value: 'canino', viewValue: 'Caninos' },
    { value: 'felino', viewValue: 'Felinos' },
    { value: 'otros', viewValue: 'Otros Veterinarios' },
  ];
  
  // Guardamos la lista completa de pacientes para poder filtrar
  private allPatients: Patient[];

  // Inyección de dependencias
  constructor(
    private patientsService: PatientsService, 
    public dialog: MatDialog
  ) {
      this.allPatients = this.patientsService.listPatients();
      this.dataSource = this.allPatients; // Inicialmente, dataSource es la lista completa
    }
  
  // --- MÉTODO DE FILTRADO ---
  applyFilter(): void {
    let filteredList = this.allPatients;
    const filterValue = this.filterType;
    
    if (filterValue !== 'todos') {
      filteredList = this.allPatients.filter(patient => {
        if (filterValue === 'humano') {
          return patient.isHuman;
        }
        
        // Filtro por especie específica (Canino, Felino...)
        if (patient.species) {
          return patient.species.toLowerCase() === filterValue;
        }

        // Filtro para otras especies o errores de clasificación
        return false;
      });
    }

    this.dataSource = filteredList; // Actualiza la tabla
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