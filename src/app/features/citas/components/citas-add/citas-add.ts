import { Component, input, output, signal } from '@angular/core';
import { Cita } from '../../types';
import { CitasService } from '../../data/citas.service';

@Component({
  selector: 'app-citas-add',
  standalone: true,
  imports: [],
  templateUrl: './citas-add.html',
  styleUrl:'./citas-add.scss'
})
export class CitasAdd {

  constructor(private citaSrv: CitasService
  ) {

  }


  // Estado inicial del formulario
  date = signal('')
  startTime = signal('')
  endTime = signal('')
  profesionalId = signal('')
  notes = signal('')
  pacienteId = signal('')
  status= 'Programada'

// Avisar al padre cuando se pulse el botón de confirmar
  newCita = output<Cita>()

  mostrarFormularioAdd: boolean = false

  togleFormAdd(){
    this.mostrarFormularioAdd = !this.mostrarFormularioAdd
  }

    onNuevaCita(cita: Cita) {
    const id = crypto.randomUUID()
    const completa: Cita = {...cita, id}

    this.citaSrv.addCita(completa) //guardamos
    console.log('Cita añadida: ', cita)

  }

  addCita(){

  if(!this.date() || !this.startTime() || !this.endTime() || !this.pacienteId() || !this.profesionalId()){

    return alert('Faltan datos para crear la cita')
  } else {
    const newCita: Cita = {
      id: 'temporal',
      date: this.date(),
      startTime: this.startTime(),
      endTime: this.endTime(),
      profesionalId: this.profesionalId(),
      pacienteId: this.pacienteId(),
      notes: this.notes(),
      status: 'Programada'
    }
    this.newCita.emit(newCita)
    console.log('Correcto')

  }

}
}

