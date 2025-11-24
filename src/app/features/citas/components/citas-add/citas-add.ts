import { ClassNameUpgradeData } from './../../../../../../node_modules/@angular/cdk/schematics/ng-update/data/class-names.d';
import { FormBuilder } from '@angular/forms';
import { Component, computed, inject, input, output, signal } from '@angular/core';
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

  timeSlots = [
  '08:00', '08:30',
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00'
];

horasOcupadas = computed(() => {
  const fecha = this.fecha(); //La fecha que el usuario ha elegido en el form
  if(!fecha) return new Set<string>(); //Si no hay fecha no desactivamos nada

  const citasDelDia = this.citasSrv.citas().filter(c => c.fecha === fecha);
  const horas = citasDelDia.map(c => c.hora_inicio);

  return new Set(horas)
})

isSlotDisabled(slot: string): boolean {
  return this.horasOcupadas().has(slot) //Explica esto
}

// Avisar al padre cuando se pulse el botón de confirmar
  newCita = output<Cita>()

  mostrarFormularioAdd: boolean = false

  togleFormAdd(){
    this.mostrarFormularioAdd = !this.mostrarFormularioAdd
  }

  onNuevaCita(cita: Cita) {

    // this.citaSrv.addCita(completa) //guardamos
    console.log('Cita añadida: ', cita)
  }


  addCita(){
  if(!this.fecha() || !this.hora_inicio() || !this.hora_final() || !this.id_paciente() || !this.id_trabajador()){
    return alert('Faltan datos para crear la cita')
    } else
      {
      this.citasSrv.addCita({
        fecha: this.fecha(),
        hora_inicio: this.hora_inicio(),
        hora_final: this.hora_final(),
        id_trabajador: this.id_trabajador(),
        id_paciente: this.id_paciente(),
        razon_cita: this.razon_cita(),
        estado: this.estado()
      })
    }
  }

  onHoraInicioChange(value:string) {
    this.hora_inicio.set(value)

    const [h,m] = value.split(':').map(Number)
    const date = new Date(0, 0, 0, h, m);
    date.setMinutes(date.getMinutes() + 30);

    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')

    this.hora_final.set(`${hh}:${mm}`)
  }
}
