import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasServicePrueba } from '../../data/citas.service';
import { Cita, Paciente } from '../../types';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../../../core/services/CitasService.service';

@Component({
  selector: 'app-citas-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas-detail.page.html',
})
export class CitasDetailPage {
  cita: Cita | null = null; // la cita actual (una sola)
  paciente: Paciente | null = null;


    private route = inject(ActivatedRoute) // 👈 para leer el id de la URL
    private citasSrv = inject(CitaService)  // 👈 para acceder a los datos


    ngAfterViewInit() { // se ejecuta al cargar la página
      this.citasSrv.getCitas()
  }
}
