export interface Cita {
  id: string;            //cita-1
  date: string;          // 'YYYY-MM-DD'
  startTime: string;     // 'HH:mm'
  endTime: string;       // 'HH:mm'
  pacienteId: string;
  profesionalId: string;
  notes?: string;
  status: 'Programada' | 'Confirmada' | 'Cancelada' | 'Completada';
}

export interface Profesional {
  id: string;
  name: string;
  specialty?: string; }

export interface Paciente {
  id: string;
  name: string; }
