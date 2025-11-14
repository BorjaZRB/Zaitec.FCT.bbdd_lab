import { Injectable } from '@angular/core';
import { Cita, Paciente, Profesional } from '../types';

@Injectable({ providedIn: 'root' })
export class CitasServicePrueba {
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
    // {
    //   id: 'apt-1',
    //   fecha: '2025-11-04',
    //   hora_inicio: '10:00',
    //   hora_final: '10:30',
    //   id_paciente: 'pac-1',
    //   id_trabajador: 'pro-1',
    //   estado: 'Confirmada',
    //   razon_cita: 'Ayunas',
    // },
    // {
    //   id: 'apt-2',
    //   fecha: '2025-11-04',
    //   hora_inicio: '11:00',
    //   hora_final: '11:30',
    //   id_paciente: 'pat-2',
    //   id_trabajador: 'pro-2',
    //   estado: 'Programada',
    // },
  ];

  // métodos para leer datos
  listCitas() { return this.citas; }

  // obtener cita por su id
  getCitas(id: number) { return this.citas.find(a => a.id_cita === id) || null; }

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
    return this.citas.filter(a => a.fecha);
  }

  //añadir nueva cita
  addCita(cita: Cita): void {
    this.citas = [...this.citas, cita];
  }

  // actualizar cita
  updateCita(cita: Cita): void {
    this.citas = this.citas.map(x => x.id_cita ? cita : x)
  }

  // borrar cita
  deleteCita(id: number): void {
    this.citas = this.citas.filter( citas => citas.id_cita !== id);
  }

}
