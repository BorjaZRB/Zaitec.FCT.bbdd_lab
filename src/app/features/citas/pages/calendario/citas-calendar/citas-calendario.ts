import { Component, LOCALE_ID,   ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  effect, } from '@angular/core';
import {
  CalendarModule,
  CalendarEvent,
  CalendarView,
  DateAdapter,
  CalendarDateFormatter,
  CalendarNativeDateFormatter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Cita } from '../../../types';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { isSameDay, isSameMonth } from 'date-fns';
import { CitaService } from '../../../../../core/services/CitasService.service';

registerLocaleData(localeEs);
@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule, CalendarModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useFactory: adapterFactory,},
    { provide: CalendarDateFormatter, useClass: CalendarNativeDateFormatter},
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  templateUrl: './citas-calendario.html',
  styleUrls: ['./citas-calendario.scss', '../../../../../../../node_modules/angular-calendar/css/angular-calendar.css'],
})

export class CitasCalendarioComponent {
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  locale = 'es';
  weekStartsOn = 1;
  citaEnEdicion: Cita | null = null;

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  private citaService = inject(CitaService)

  constructor() {
    this.citaService.getCitas(); //Cargamos las citas

    effect(() => {
      const citas = this.citaService.citas(); // <------- Signal computed del servicio
      this.events = citas.map(c => ({
        id: c.id_cita,
        title: `Paciente ${c.id_paciente} · ${c.hora_inicio} - ${c.hora_final}${c.razon_cita ? ' · ' + c.razon_cita : ''}`,
        start: this.combineDateTime(c.fecha, c.hora_inicio),
        end: this.combineDateTime(c.fecha, c.hora_final),
        actions: [
          { label: '<i class="fas fa-pencil-alt"></i>', onClick: ({ event }) =>  this.editCita(event)},
          { label: '<i class="fas fa-trash-alt"></i>',  onClick: ({ event }) => this.citaService.deleteCita(c) }
        ]
      }));
      this.refresh.next();
    })
  }


  combineDateTime(fechaISO: string, horaHHmm: string): Date {
    const [y , m , d] = fechaISO.split('-').map(Number)
    const [ hh , mm ] = horaHHmm.split(':').map(Number)
    return new Date (y, m - 1, d, hh, mm)
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  activeDayIsOpen: boolean = false;
  selectedDate: Date | null = null;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }



  mostrarFormEdit: boolean = false

  toggleFormEdit(){
    this.mostrarFormEdit = !this.mostrarFormEdit
  }

  editCita(event: CalendarEvent): void {

    this.toggleFormEdit();

    const id = event.id;
    const todas = this.citaService.citas();
    const cita = todas.find( c => c.id_cita === id);

    this.citaEnEdicion = cita ?? null

    console.log('Cita en edicion: ', this.citaEnEdicion)

  }
  async guardarEdicion() {
    // Si no hay cita en edición, no hacemos nada
    if (!this.citaEnEdicion) {
      return;
    }

    // Llamamos al servicio para actualizar en Supabase
    await this.citaService.updateCita(this.citaEnEdicion);

    // Opcional: mover la vista del calendario al día de la cita editada
    this.viewDate = this.combineDateTime(
      this.citaEnEdicion.fecha,
      this.citaEnEdicion.hora_inicio
    );

    // Cerramos el formulario de edición y limpiamos la referencia
    this.mostrarFormEdit = false;
    this.citaEnEdicion = null;

    // Notificamos al calendario (aunque el effect ya hace refresh, esto ayuda a asegurarlo)
    this.refresh.next();
  }
}
