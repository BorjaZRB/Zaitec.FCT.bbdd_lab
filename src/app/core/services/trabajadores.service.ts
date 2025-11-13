import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';

export interface Trabajador {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  rol?: string;
  centroAsignado?: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class TrabajadoresService {
  private supabase: SupabaseClient;

  constructor() {
    // Conexión a Supabase
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Obtener todos los trabajadores
  async getAll(): Promise<{ data: Trabajador[] | null; error: any }> {
  const { data, error } = await this.supabase.from('trabajadores').select('*');
    return { data, error };
  }

  // Obtener un trabajador por id
  async getById(id: number | string): Promise<{ data: Trabajador | null; error: any }> {
  const { data, error } = await this.supabase.from('trabajadores').select('*').eq('id', id).single();
    return { data, error };
  }

  // Crear un nuevo trabajador
  async create(trabajador: Partial<Trabajador>): Promise<{ data: Trabajador | null; error: any }> {
  const { data, error } = await this.supabase.from('trabajadores').insert(trabajador).select().single();
    return { data, error };
  }

  // Actualizar un trabajador existente
  async update(id: number | string, patch: Partial<Trabajador>): Promise<{ data: Trabajador | null; error: any }> {
  const { data, error } = await this.supabase.from('trabajadores').update(patch).eq('id', id).select().single();
    return { data, error };
  }

  // Eliminar un trabajador
  async remove(id: number | string): Promise<{ data: any; error: any }> {
    const { data, error } = await this.supabase.from('trabajadores').delete().eq('id', id);
    return { data, error };
  }
}
