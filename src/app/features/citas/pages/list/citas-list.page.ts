import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // 👈 para *ngFor / *ngIf
import { RouterLink } from '@angular/router';
import { CitasService } from '../../data/citas.service';
import { Cita } from '../../types';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, RouterLink],   // 👈 añade CommonModule
  templateUrl: './citas-list.page.html',
})
export class CitasListPage {
  citas: Cita[] = [];

  constructor(private citasSrv: CitasService) {
    this.citas = this.citasSrv.listCitas(); // 👈 datos mock
  }
}
