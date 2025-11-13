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
import { CitasServicePrueba } from '../../../data/citas.service';
import { Cita } from '../../../types';
import { CitasAdd } from '../../../components/citas-add/citas-add';
import { CitasListPage } from '../../list/citas-list.page';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { isSameDay, isSameMonth } from 'date-fns';
import { CitaService } from '../../../../../core/services/CitasService.service';

registerLocaleData(localeEs);
@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule, CalendarModule, FormsModule, CitasAdd, CitasListPage],
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

  events: CalendarEvent[] = [
    // los eventos se cargan desde el servicio
];

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
          { label: '<i class="fas fa-pencil-alt"></i>', onClick: ({ event }) => this.editCita(event) },
          { label: '<i class="fas fa-trash-alt"></i>',  onClick: ({ event }) => this.deleteCita(event) }
        ]
      }));
      this.refresh.next(); //Que hace esto?
    })
  }


  private combineDateTime(fechaISO: string, horaHHmm: string): Date {
    const [y , m , d] = fechaISO.split('-').map(Number)
    const [ hh , mm ] = horaHHmm.split(':').map(Number)
    return new Date (y, m - 1, d, hh, mm)
  }

   mostrarLista: boolean = false

  togleList(){
    this.mostrarLista = !this.mostrarLista
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

    // Crear cita desde el formulario hijo
  async onNuevaCita(cita: Cita) {
    await this.citaService.addCita(cita);
    // no hace falta push manual a events: el effect ya lo hará al refrescar getCitas()
    this.viewDate = this.combineDateTime(cita.fecha, cita.hora_inicio);
    this.refresh.next();
  }
  // const completa: Cita = { ...cita,  };

  // 2) guardar en el servicio (fuente de verdad)
  // this.citaSrv.addCita(completa);

  // 3) pintar en el calendario (añadimos 1 evento mapeado)


  deleteCita(citaToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== citaToDelete);
    this.refresh.next();
  }

  editCita(cita: CalendarEvent): void {
    const index = this.events.indexOf(cita);
    if (index !== -1) {
      this.events[index] = { ...cita };
      this.refresh.next();
    }
  }
}
