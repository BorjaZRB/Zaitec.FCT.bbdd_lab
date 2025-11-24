export interface Cita {
  id_cita: number;            //cita-1
  fecha: string;          // 'YYYY-MM-DD'
  hora_inicio: string;     // 'HH:mm'
  hora_final: string;       // 'HH:mm'
  id_paciente: string;
  id_trabajador: string;
  razon_cita?: string;
  estado: string;
}

export interface Profesional {
  id: string;
  name: string;
  specialty?: string; }

export interface Paciente {
  id: string;
  name: string; }
