 import { computed, inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';
import { Cita } from '../../features/citas/types';
import { AuthService } from './AuthService';

interface CitaState {
  citas: Cita[];
  loading: boolean;
  error: boolean;
}

@Injectable({providedIn: 'root'})
export class CitaService{
  private supabase: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);
  private auth = inject(AuthService);

  // Estado inicial de las citas
  citaState = signal<CitaState>({
    citas: [],
    loading: false,
    error: false
  });


  // Selectores para acceder a partes del estado.
  // Computed hace que se actualicen automáticamente al cambiar el estado.
  citas = computed(() => this.citaState().citas);
  loading = computed(() => this.citaState().loading);
  error = computed(() => this.citaState().error);

  async getCitas (): Promise<void>{
    this.citaState.update((state) => ({...state, loading:true, error:false}));
      const { data, error } = await this.supabase
  .from('cita')
  .select('*');

if (!error && data) {
  const citasNormalizadas = data.map((row) => ({
    ...row,
    hora_inicio: row.hora_inicio.slice(0, 5), // '08:00:00' -> '08:00'
    hora_final: row.hora_final.slice(0, 5),   // '08:30:00' -> '08:30'
  }));

  this.citaState.set({
    citas: citasNormalizadas,
    loading: false,
    error: false,
  });
}
    }

  async addCita(cita: Omit<Cita, "id_cita">): Promise<void> {
    const { error } = await this.supabase.from('cita').insert([cita]);
    if (error) {
      console.error('Error insertando cita', error);
      this.citaState.update(s => ({ ...s, error: true }));
      return;
    }
    await this.getCitas(); // recarga lista tras insertar
  }

  async updateCita(cita: Cita): Promise<void> {
    const { error } = await this.supabase
      .from('cita')
      .update({
        fecha: cita.fecha,
        hora_inicio: cita.hora_inicio,
        hora_final: cita.hora_final,
        id_trabajador: cita.id_trabajador,
        id_paciente: cita.id_paciente,
        razon_cita: cita.razon_cita,
        estado: cita.estado,
      })
      .eq('id_cita', cita.id_cita);
    if (error) {
    console.error('Error actualizando cita', error);
    this.citaState.update(s => ({ ...s, error: true }));
    return;
  }

  await this.getCitas();

  }

    async deleteCita(cita: Cita): Promise<void> {
    const { error } = await this.supabase.from('cita').delete().eq('id_cita', cita.id_cita)
    if (error) {
      console.error('Error eliminando cita', error);
      this.citaState.update(s => ({ ...s, error: true }));
      return;
    }
    await this.getCitas(); // recarga lista tras insertar
  }


  }



