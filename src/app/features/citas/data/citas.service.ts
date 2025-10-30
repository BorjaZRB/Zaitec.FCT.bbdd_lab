import { Injectable } from '@angular/core';
import { Appointment, Patient, Professional } from '../types';

@Injectable({ providedIn: 'root' })
export class CitasService {
  // profesionales de ejemplo
  private professionals: Professional[] = [
    { id: 'pro-1', name: 'Dra. García', specialty: 'Radiología' },
    { id: 'pro-2', name: 'Dr. López', specialty: 'Análisis' },
  ];

  // pacientes de ejemplo
  private patients: Patient[] = [
    { id: 'pat-1', name: 'Ana Pérez' },
    { id: 'pat-2', name: 'Luis Díaz' },
  ];

  // citas de ejemplo
  private appointments: Appointment[] = [
    {
      id: 'apt-1',
      date: '10-06-2025',
      startTime: '10:00',
      endTime: '10:30',
      patientId: 'pat-1',
      professionalId: 'pro-1',
      status: 'Confirmada',
      notes: 'Ayunas',
    },
    {
      id: 'apt-2',
      date: '20-01-2025',
      startTime: '11:00',
      endTime: '11:30',
      patientId: 'pat-2',
      professionalId: 'pro-2',
      status: 'Programada',
    },
  ];

  // métodos para leer datos
  listAppointments() { return this.appointments; }
  getAppointment(id: string) { return this.appointments.find(a => a.id === id) || null; }
}
