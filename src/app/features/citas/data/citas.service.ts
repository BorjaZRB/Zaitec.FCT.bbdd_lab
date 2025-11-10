import { Injectable } from '@angular/core';
import { Cita, Paciente, Profesional } from '../types';

@Injectable({ providedIn: 'root' })
export class CitasService {
  // profesionales de ejemplo
  private profesionales: Profesional[] = [
    { id: 'pro-1', name: 'Dra. García', specialty: 'Radiología' },
    { id: 'pro-2', name: 'Dr. López', specialty: 'Análisis' },
  ];

  // pacientes de ejemplo
  private pacientes: Paciente[] = [
    { id: 'pat-1', name: 'Ana Pérez' },
    { id: 'pat-2', name: 'Luis Díaz' },
  ];

  // citas de ejemplo
  private citas: Cita[] = [
    {
      id: 'apt-1',
      date: '2025-11-04',
      startTime: '10:00',
      endTime: '10:30',
      pacienteId: 'pac-1',
      profesionalId: 'pro-1',
      status: 'Confirmada',
      notes: 'Ayunas',
    },
    {
      id: 'apt-2',
      date: '2025-11-04',
      startTime: '11:00',
      endTime: '11:30',
      pacienteId: 'pat-2',
      profesionalId: 'pro-2',
      status: 'Programada',
    },
  ];

  // métodos para leer datos
  listCitas() { return this.citas; }

  // obtener cita por su id
  getCitas(id: string) { return this.citas.find(a => a.id === id) || null; }

  // obtener profesionales
  listProfesionales(): Profesional[] {
    return this.profesionales
  }

  // obtener pacientes
  listPacientes(): Paciente[]{
    return this.pacientes
  }

  // obtener cita por fecha
  appointmentByDate(dateISO: string): Cita[] {
    return this.citas.filter(a => a.date === dateISO);
  }

  //añadir nueva cita
  addCita(cita: Cita): void {
    this.citas = [...this.citas, cita];
  }

  // actualizar cita
  updateCita(cita: Cita): void {
    this.citas = this.citas.map(x => x.id ? cita : x)
  }

  // borrar cita
  deleteCita(id: string): void {
    this.citas = this.citas.filter( citas => citas.id !== id)
  }

}
