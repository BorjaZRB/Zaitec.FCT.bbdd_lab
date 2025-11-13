import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';

export interface Paciente {
  id_paciente: number;
  nombre: string;
  apellidos: string;
  nombreCompleto?: string;
}

export interface Centro {
  id_centro: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Insertar análisis
  async agregarAnalisis(resultado: any) {
    const { error } = await this.supabase.from('analisis').insert([resultado]);
    if (error) throw error;
  }

  // Obtener análisis
  async obtenerAnalisis() {
    const { data, error } = await this.supabase
      .from('analisis')
      .select('*')
      .order('fecha', { ascending: false });
    if (error) throw error;
    return data;
  }

  // Actualizar análisis
  async actualizarAnalisis(id: number, cambios: Partial<any>) {
    const { error } = await this.supabase
      .from('analisis')
      .update(cambios)
      .eq('id', id);
    if (error) throw error;
  }

  // Obtener pacientes con nombre completo
  async obtenerPacientes(): Promise<Paciente[]> {
    const { data, error } = await this.supabase
      .from('pacientes')
      .select('id_paciente, nombre, apellidos')
      .order('nombre', { ascending: true });

    if (error) throw error;

    return data.map((p: any) => ({
      ...p,
      nombreCompleto: `${p.nombre} ${p.apellidos}`,
    }));
  }

  // Obtener centros
  async obtenerCentros(): Promise<Centro[]> {
    const { data, error } = await this.supabase
      .from('centros')
      .select('id_centro, nombre')
      .order('nombre', { ascending: true });
    if (error) throw error;
    return data;
  }
}

