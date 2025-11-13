import { Component, inject, input, output, signal } from '@angular/core';
import { Cita } from '../../types';
import { CitaService } from '../../../../core/services/CitasService.service';

@Component({
  selector: 'app-citas-add',
  standalone: true,
  imports: [],
  templateUrl: './citas-add.html',
  styleUrl:'./citas-add.scss'
})
export class CitasAdd {

    public citasSrv = inject(CitaService)  // 👈 para acceder a los datos

  // Estado inicial del formulario
  id_cita = signal('')
  fecha = signal('')
  hora_inicio = signal('')
  hora_final = signal('')
  id_trabajador = signal('')
  razon_cita = signal('')
  id_paciente = signal('')
  estado= signal('')

// Avisar al padre cuando se pulse el botón de confirmar
  newCita = output<Cita>()

  mostrarFormularioAdd: boolean = false

  togleFormAdd(){
    this.mostrarFormularioAdd = !this.mostrarFormularioAdd
  }

    onNuevaCita(cita: Cita) {

    const completa: Cita = {...cita, id_cita: this.citasSrv.citaState().citas.length + 1}
    // this.citaSrv.addCita(completa) //guardamos
    console.log('Cita añadida: ', cita)}


  addCita(){

  if(!this.fecha() || !this.hora_inicio() || !this.hora_final() || !this.id_paciente() || !this.id_trabajador()){

    return alert('Faltan datos para crear la cita')
  } else {
    this.citasSrv.insertCita({
      id_cita: this.citasSrv.citaState().citas.length + 1,
      fecha: this.fecha(),
      hora_inicio: this.hora_inicio(),
      hora_final: this.hora_final(),
      id_trabajador: this.id_trabajador(),
      id_paciente: this.id_paciente(),
      razon_cita: this.razon_cita(),
      estado: this.estado()
    })

    // const newCita: Cita = {
    //   id_cita: this.id_cita(),
    //   fecha: this.fecha(),
    //   hora_inicio: this.hora_inicio(),
    //   hora_final: this.hora_final(),
    //   id_trabajador: this.id_trabajador(),
    //   id_paciente: this.id_paciente(),
    //   razon_cita: this.razon_cita(),
    //   estado: this.estado()
    // }
    // this.newCita.emit(newCita)
    // console.log('Correcto')

  }

}
}
