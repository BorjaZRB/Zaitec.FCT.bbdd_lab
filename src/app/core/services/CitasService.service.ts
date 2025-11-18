import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase.client';
import { Cita } from '../../features/citas/types';
import { AuthService } from './AuthService';

interface CitaState {
  citas: Cita[];
  loading: boolean;
  error: boolean;
}

@Injectable({providedIn: 'root'})
export class CitaService{
  private supabase: SupabaseClient = supabase;
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
      const{data, error} = await this.supabase
        .from('cita')
        .select('*')
        .returns<Cita[]>(); // Sin punto??

        console.log(data)

        if (error) {
          console.error(error)
          this.citaState.update((state) => ({...state, loading:false, error:true}));
          return;
        }

          this.citaState.update((state) => ({
            ...state,
            citas: data ?? [],
            loading: false,
            error: false
          }))
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



