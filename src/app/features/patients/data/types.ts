export interface Appointment {
  id: string;
  date: string;          // 'DD-MM-YYYY'
  startTime: string;     // 'HH:mm'
  endTime: string;       // 'HH:mm'
  patientId: string;
  professionalId: string;
  notes?: string;
  status: 'Programada' | 'Confirmada' | 'Cancelada' | 'Completada';
}

export interface Professional {
  id: string;
  name: string;
  specialty?: string; }

export interface Patient {
  id: string;
  name: string; }
