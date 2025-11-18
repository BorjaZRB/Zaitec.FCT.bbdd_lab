import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase.client';

export interface Trabajador {
  id?: number;
  id_centro?: number | null;
  id_coordinador?: number | null;
  nombre: string;
  apellidos: string;
  telefono?: string;
  puesto_trabajo?: string;
  email: string;
  dni: string;
  id_trabajador?: number | null;
  contraseña: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class TrabajadoresService {
  private supabase: SupabaseClient = supabase;

  // No constructor needed — we reuse the shared supabase client

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
