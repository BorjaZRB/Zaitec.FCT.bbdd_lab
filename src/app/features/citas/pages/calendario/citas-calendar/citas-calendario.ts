import { Component } from '@angular/core';
import {
  DateAdapter,
  provideCalendar,
  CalendarPreviousViewDirective,
  CalendarTodayDirective,
  CalendarNextViewDirective,
  CalendarMonthViewComponent,
  CalendarWeekViewComponent,
  CalendarDayViewComponent,
  CalendarEvent,
  CalendarView,
  CalendarDatePipe,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData, TitleCasePipe} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CitasService } from '../../../data/citas.service';
import { Cita } from '../../../types';
import { CitasAdd } from '../../../components/citas-add/citas-add';
import { CitasListPage } from "../../list/citas-list.page";

registerLocaleData(localeEs);

@Component({
  selector: 'app-citas-calendario',
  standalone: true,
  imports: [
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarDatePipe,
    TitleCasePipe,
    CitasAdd,
    CitasListPage
],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './citas-calendario.html',
  styleUrls: ['./citas-calendario.scss'],
})
export class CitasCalendarioComponent {
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  view: CalendarView = CalendarView.Day;
  weekStartsOn: number = 1;

  locale: string = "es"
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Cita de ejemplo',
    },
  ];

  constructor(private citaSrv: CitasService) {

    const citas = this.citaSrv.listCitas()
    this.events = citas.map(c => ({
      id: c.id,
      title: `Paciente ${c.pacienteId} · ${c.startTime} - ${c.endTime}`,
      start: this.combineDateTime(c.date, c.startTime),
      end: this.combineDateTime(c.date, c.endTime)
    }))

  }

  private combineDateTime(fechaISO: string, horaHHmm: string): Date {
    const [y , m , d] = fechaISO.split('-').map(Number)
    const [ hh , mm ] = horaHHmm.split(':').map(Number)
    return new Date (y, m - 1, d, hh, mm)
  }

  mostrarFormularioAdd: boolean = false

  togleFormAdd(){
    this.mostrarFormularioAdd = !this.mostrarFormularioAdd
  }

   mostrarLista: boolean = false

  togleList(){
    this.mostrarLista = !this.mostrarLista
  }

  onNuevaCita(cita: Cita) {
    const id = crypto.randomUUID()
    const completa: Cita = {...cita, id}

    this.citaSrv.addCita(completa) //guardamos
    console.log('Cita añadida: ', cita)

  }


  setView(view: CalendarView) {
    this.view = view;
  }
}
