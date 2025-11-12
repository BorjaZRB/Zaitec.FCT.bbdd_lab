import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';
import { single } from 'rxjs';
import { Cita } from '../../features/citas/types';
import { AuthService } from './AuthService';

interface CitaState {
  citas: Cita[];
  loading: boolean;
  error: boolean;
}

@Injectable({providedIn: 'root'})

export class CitaService{
private supabase: SupabaseClient;

private authService = AuthService;


  constructor() {
    // URL Y API KEY DE SUPABASE IMPORTADAS DE ENVIRONMENT
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

   citaState = signal<CitaState>({
    citas: [],
    loading: false,
    error: false
  });



  async getCitas (){
    try {
      this.citaState.update((state) => ({
        ...state,
        loading:true,
      }));
      // const {data:session} = await this
      const{data, error} = await this.supabase
        .from('cita')
        .select('*')
        .returns<Cita[]>(); // Sin punto??

        console.log(data)

        if(data){
          this.citaState.update((state) => ({
            ...state,
            citas: data
          }))
        }
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }

  }

 async insertCita(cita: {id_cita:number, fecha: string, hora_inicio: string, hora_final: string, razon_cita: string, estado: string, id_trabajador: string, id_paciente: string}){
  try{
  const response = await this.supabase.from('cita').insert({
            id_cita: cita.id_cita + 1,
            fecha: cita.fecha,
            hora_inicio: cita.hora_inicio,
            hora_final: cita.hora_final,
            id_trabajador: cita.id_trabajador,
            id_paciente: cita.id_paciente,
            razon_cita: cita.razon_cita,
            estado: cita.estado
    })

    console.log(response)
  }
 catch (error) {
  console.error('Error al insertar la cita:', error);
}
}


  //Método para añadir cliente (añadir Cita)
  async addCita(id_cita:string, fecha: Date, hora_inicio: Date, hora_final: Date, razon_cita: string, estado: string, id_trabajador: string, id_paciente: string ) { //pacienteId y id ??
    try {

      const { data, error } = await this.supabase
        .from('cita')
        .insert([
          {
            id_cita: id_cita,
            fecha: fecha,
            hora_inicio: hora_inicio,
            hora_final: hora_final,
            id_trabajador: id_trabajador,
            id_paciente: id_paciente,
            razon_cita: razon_cita,
            estado: estado
          }
        ]);
      return { error, data };
    } catch (error) {
      return { error, data: null };
    }
  }

}
function returns<T>() {
  throw new Error('Function not implemented.');
}

