// Definición de la interfaz de un Paciente
export interface Patient {
  id: number;
  
  // Identificador general (NUHSA para humanos, Código de Ficha para animales)
  identificationCode: string; 

  // Indica si es humano o animal (Necesario para diferenciar las fichas)
  isHuman: boolean; 

  // Datos básicos (para humanos y animales)
  name: string;
  birthdate: string; // Fecha de nacimiento (humano) o de registro (animal)
  
  // Datos específicos de humanos
  surname?: string; // Es opcional para animales
  phone?: string;   // Es opcional para animales
  email?: string;   // Es opcional para animales
  
  // Datos específicos de animales
  species?: string;  // Ejemplo: "Canino", "Felino", "Bovino"
  breed?: string;    // Raza del animal
  ownerName?: string; // Nombre del dueño (opcional, pero útil)

  // Relaciones
  centerId: number; // Para relacionar con el centro médico
}