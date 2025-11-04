import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';     
import { MatTableModule } from '@angular/material/table';   
import { MatCardModule } from '@angular/material/card';     

// 1. IMPORTACIÓN DE LOS DATOS Y SERVICIOS
import { CitasService } from '../../data/citas.service'; 
import { Appointment } from '../../types';  

@Component({
  selector: 'app-citas',
  standalone: true,
  // 2. IMPORTS NECESARIOS PARA EL TEMPLATE
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})

// 3. CLASE
export class CitasComponent {

  displayedColumns: string[] = ['fecha', 'paciente', 'tipoAnalisis', 'centro', 'estado', 'acciones'];
  
  // La fuente de datos es ahora el tipo Appointment
  dataSource: Appointment[] = []; 

  // 4. INYECCIÓN DEL SERVICIO
  constructor(private citasService: CitasService) {
      // Obtener las citas reales del servicio al inicializar el componente
      this.dataSource = this.citasService.listAppointments();
  }

  // Método que se ejecutará al hacer clic en 'Nueva Cita'
  openNewAppointmentDialog() {
    console.log('Abrir diálogo para nueva cita...');
  }

  // Método para futuras acciones de la tabla
  editAppointment(cita: Appointment) {
    console.log('Editando cita:', cita);
  }
}