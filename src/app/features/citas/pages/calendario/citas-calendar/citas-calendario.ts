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
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { es } from 'date-fns/locale';
import { Subject } from 'rxjs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { registerLocaleData as registerLocaleFn } from '@angular/common';

registerLocaleData(localeEs);

@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
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
  styleUrl: './citas-calendario.scss',
})
export class CitasCalendarioComponent {
  readonly CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  locale: string = 'es';
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private dialog: MatDialog) {}

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
