import { Component, LOCALE_ID } from '@angular/core';
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
import { CdkOverlayOrigin } from "@angular/cdk/overlay";

registerLocaleData(localeEs);

@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    CitasAdd,
    CitasListPage,
    // CdkOverlayOrigin
],
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
  styleUrls: ['./citas-calendario.scss'],
})
export class CitasCalendarioComponent {
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  view: CalendarView = CalendarView.Day;
  locale: string = 'es';
  weekStartsOn: number = 1;

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  refresh = new Subject<void>();

  constructor(private citaSrv: CitasService) {
    const citas = this.citaSrv.listCitas();
    this.events = citas.map((c) => ({
      id: c.id,
      title: `Paciente ${c.pacienteId} · ${c.startTime} - ${c.endTime}`,
      start: this.combineDateTime(c.date, c.startTime),
      end: this.combineDateTime(c.date, c.endTime),
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

  dayClicked({ day }: { day: { date: Date }; sourceEvent: MouseEvent | KeyboardEvent }): void {
    this.activeDayIsOpen = !this.activeDayIsOpen;
    if (!this.activeDayIsOpen) {
      this.addEvent(day.date);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  addEvent(date: Date): void {
    this.events = [
      ...this.events,
      {
        title: 'Nueva Cita',
        start: date,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  editEvent(event: CalendarEvent): void {
    const index = this.events.indexOf(event);
    if (index !== -1) {
      this.events[index] = { ...event };
      this.refresh.next();
    }
  }
}
