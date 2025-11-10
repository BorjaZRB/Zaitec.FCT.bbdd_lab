import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // 👈 para *ngFor / *ngIf
import { RouterLink } from '@angular/router';
import { CitasService } from '../../data/citas.service';
import { Cita } from '../../types';
import { FilterPipe } from './filter.pipe';
import { CitasComponent } from "../citas/citas.component";
import { CitasAdd } from "../../components/citas-add/citas-add";
FilterPipe

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, CitasAdd],   // 👈 añade CommonModule
  templateUrl: './citas-list.page.html',
  styleUrl: './citas-list.page.scss'
})
export class CitasListPage {
  // searchText: string;

  citas: Cita[] = [];

  constructor(private citasSrv: CitasService) {
    this.citas = this.citasSrv.listCitas(); // 👈 datos mock
  }



}


