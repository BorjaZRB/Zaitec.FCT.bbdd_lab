import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Añadido de feature/EP-03-Agenda-Citas
import { MatButtonModule } from '@angular/material/button'; // <-- Añadido de feature/EP-03-Agenda-Citas
import { MatIconModule } from '@angular/material/icon';     // <-- Añadido de feature/EP-03-Agenda-Citas
import { MatTableModule } from '@angular/material/table';   // <-- Añadido de feature/EP-03-Agenda-Citas
import { MatCardModule } from '@angular/material/card';     // <-- Añadido de feature/EP-03-Agenda-Citas

// 1. IMPORTACIÓN DE LOS DATOS Y SERVICIOS DE feature/EP-03-Agenda-Citas
import { CitasService } from '../data/citas.service'; // Ruta al servicio
import { Appointment } from '../data/types';  // Tipo de datos (Ajusta la ruta si 'types' está en otra carpeta)

@Component({
  selector: 'app-citas',
  standalone: true,
  // 2. FUSIÓN DE IMPORTS
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

// 3. FUSIÓN DE LA CLASE: Inyección y Lógica de Datos
export class CitasComponent {

  displayedColumns: string[] = ['fecha', 'paciente', 'tipoAnalisis', 'centro', 'estado', 'acciones'];
  
  // La fuente de datos es ahora el tipo Appointment
  dataSource: Appointment[] = []; 

  // 4. INYECCIÓN DEL SERVICIO DE feature/EP-03-Agenda-Citas
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
