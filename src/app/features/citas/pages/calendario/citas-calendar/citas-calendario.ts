import { Component, LOCALE_ID,   ChangeDetectionStrategy,
  ViewEncapsulation, } from '@angular/core';
import {
  CalendarModule,
  CalendarEvent,
  CalendarView,
  DateAdapter,
  CalendarDateFormatter,
  CalendarNativeDateFormatter,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CitasService } from '../../../data/citas.service';
import { Cita } from '../../../types';
import { CitasAdd } from '../../../components/citas-add/citas-add';
import { CitasListPage } from '../../list/citas-list.page';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { isSameDay, isSameMonth } from 'date-fns';
import { CdkOverlayOrigin } from "@angular/cdk/overlay";



registerLocaleData(localeEs);

@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    CitasAdd,
    CitasListPage,
    // CdkOverlayOrigin
],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    {
      provide: CalendarDateFormatter,
      useClass: CalendarNativeDateFormatter,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
  ],
  templateUrl: './citas-calendario.html',
  styleUrls: ['./citas-calendario.scss', '../../../../../../../node_modules/angular-calendar/css/angular-calendar.css'],
})
export class CitasCalendarioComponent {
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  view: CalendarView = CalendarView.Month;
  locale: string = 'es';
  weekStartsOn: number = 1;

  events: CalendarEvent[] = [
        {
      start: new Date(),
      title: 'An event',
    },
  ];

  refresh = new Subject<void>();

  constructor(private citaSrv: CitasService) {
    const citas = this.citaSrv.listCitas();
    this.events = citas.map((c) => ({
      id: c.id,
      title: `Paciente ${c.pacienteId} · ${c.startTime} - ${c.endTime}`,
      start: this.combineDateTime(c.date, c.startTime),
      end: this.combineDateTime(c.date, c.endTime),
      actions: [
  {
    label: '<i class="fas fa-pencil-alt"></i>',
    onClick: ({ event }) => this.editCita(event)
  },
  {
    label: '<i class="fas fa-trash-alt"></i>',
    onClick: ({ event }) => this.deleteCita(event)
  }
]
    }));
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

 addCita(cita: Cita): void {
const id = cita.id && cita.id.trim() ? cita.id : crypto.randomUUID();

  const completa: Cita = { ...cita, id };

  // 2) guardar en el servicio (fuente de verdad)
  this.citaSrv.addCita(completa);

  // 3) pintar en el calendario (añadimos 1 evento mapeado)
  const nuevoEvento: CalendarEvent = {
    id,
    title: `Paciente ${completa.pacienteId} · ${completa.startTime} - ${completa.endTime}  ${completa.notes ? '| ' + completa.notes : ''} | ${completa.status}`,
    start: this.combineDateTime(completa.date, completa.startTime),
    end:   this.combineDateTime(completa.date, completa.endTime),
    // (opcional) añade acciones si las usas en el resto:
    actions: [
      { label: '<i class="fas fa-pencil-alt"></i>', onClick: ({ event }) => this.editCita(event) },
      { label: '<i class="fas fa-trash-alt"></i>',  onClick: ({ event }) => this.deleteCita(event) }
    ]
  };

  this.events = [...this.events, nuevoEvento];

   // 4) si estás en vista mensual, abrir el día y centrar la fecha
  this.viewDate = nuevoEvento.start;
  this.activeDayIsOpen = true;

  // 5) notificar a angular-calendar (usas OnPush)
  this.refresh.next();
}

  deleteCita(citaToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== citaToDelete);
  }

  editCita(cita: CalendarEvent): void {
    const index = this.events.indexOf(cita);
    if (index !== -1) {
      this.events[index] = { ...cita };
      this.refresh.next();
    }
  }
}
