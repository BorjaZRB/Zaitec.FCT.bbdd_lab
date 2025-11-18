import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';   // 👈 para *ngFor / *ngIf
import { RouterLink } from '@angular/router';
import { Cita } from '../../types';
import { CitaService } from '../../../../core/services/CitasService.service';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule],   // 👈 añade CommonModule
  templateUrl: './citas-list.page.html',
  styleUrl: './citas-list.page.scss'
})
export class CitasListPage {
  // searchText: string;

  citas: Cita[] = [];

    public citasSrv = inject(CitaService)  // 👈 para acceder a los datos


    ngAfterViewInit() { // se ejecuta al cargar la página
      this.citasSrv.getCitas()
  }



}


