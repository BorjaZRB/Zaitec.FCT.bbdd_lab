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

  async addCita(cita: Cita): Promise<void> {
    const { error } = await this.supabase.from('cita').insert([cita]);
    if (error) {
      console.error('Error insertando cita', error);
      this.citaState.update(s => ({ ...s, error: true }));
      return;
    }
    await this.getCitas(); // recarga lista tras insertar
  }

   async deleteCita(cita: Cita): Promise<void> {
    const {error} = await this.supabase.from('cita').delete()
  }


  }



