import { Component } from '@angular/core';
import {
  CalendarModule,
  CalendarEvent,
  CalendarView,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  imports: [
    CalendarModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
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

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Cita de ejemplo',
    },
  ];

  setView(view: CalendarView) {
    this.view = view;
  }
}
