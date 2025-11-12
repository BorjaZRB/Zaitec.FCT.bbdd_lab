import { Injectable } from '@angular/core';
import { Patient } from './patients.types'; 

// Datos de simulación (simulando la respuesta de Supabase)
const MOCK_PATIENTS: Patient[] = [
  // 1. PACIENTE HUMANO
  {
    id: 1,
    identificationCode: '0000000001', // NUHSA
    isHuman: true,
    name: 'Ana',
    surname: 'Martínez García',
    birthdate: '1995-03-10',
    phone: '611223344',
    email: 'ana.martinez@ejemplo.com',
    centerId: 101,
  },
  // 2. PACIENTE VETERINARIO (Animal)
  {
    id: 2,
    identificationCode: 'VET-2025-0045', 
    isHuman: false,
    name: 'Max',
    birthdate: '2023-01-20', // Fecha de registro/nacimiento
    species: 'Canino',
    breed: 'Labrador',
    ownerName: 'Borja López',
    centerId: 102,
  },
  // 3. PACIENTE HUMANO
  {
    id: 3,
    identificationCode: '0000000003',
    isHuman: true,
    name: 'Carla',
    surname: 'Pérez Ruiz',
    birthdate: '2001-07-01',
    phone: '600112233',
    email: 'carla.perez@ejemplo.com',
    centerId: 101,
  },
];

@Injectable({
  providedIn: 'root', 
})
export class PatientsService {

  constructor() { }

  public listPatients(): Patient[] {
    return MOCK_PATIENTS;
  }
}