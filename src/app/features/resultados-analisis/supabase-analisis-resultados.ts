import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';

export interface Paciente {
  id_paciente: number;
  nombre: string;
  apellidos: string;
}

export interface ResultadoAnalisis {
  id_analisis?: number;
  pacienteId: number;
  paciente?: Paciente;
  tipo: string;
  fecha: string;
  descripcion: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class SupabaseAnalisisService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Obtener todos los análisis con el paciente
  async obtenerAnalisis(): Promise<ResultadoAnalisis[]> {
    const { data, error } = await this.supabase
      .from('analisis')
      .select(`
        id_analisis,
        tipo,
        fecha,
        descripcion,
        activo,
        paciente:id_paciente (
          id_paciente,
          nombre,
          apellidos
        )
      `)
      .order('fecha', { ascending: false });

    if (error) throw error;
    return (data as unknown as ResultadoAnalisis[]) || [];
  }

  // Agregar un nuevo análisis
  async agregarAnalisis(resultado: ResultadoAnalisis) {
    const { error } = await this.supabase
      .from('analisis')
      .insert([{
        tipo: resultado.tipo,
        fecha: resultado.fecha,
        descripcion: resultado.descripcion,
        activo: resultado.activo,
        id_paciente: resultado.pacienteId
      }]);
    if (error) throw error;
  }

  // Obtener todos los pacientes
  async obtenerPacientes(): Promise<Paciente[]> {
    const { data, error } = await this.supabase
      .from('pacientes')
      .select('id_paciente, nombre, apellidos');

    if (error) throw error;
    return (data as unknown as Paciente[]) || [];
  }

  // Obtener tipos de análisis
  async obtenerTiposAnalisis(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('analisis')
      .select('tipo');

    if (error) throw error;
    return [...new Set((data as unknown[]).map(a => (a as any).tipo))];
  }
}
