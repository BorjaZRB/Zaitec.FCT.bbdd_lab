import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasService } from '../../data/citas.service';
import { Appointment, Patient } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas-detail.page.html',
})
export class CitasDetailPage {
  cita: Appointment | null = null; // la cita actual (una sola)
  paciente: Patient | null = null;

  constructor(
    private route: ActivatedRoute,  // 👈 para leer el id de la URL
    private citasSrv: CitasService  // 👈 para acceder a los datos
  ) {
    // leemos el id de la ruta, ejemplo "apt-1"
    const id = this.route.snapshot.paramMap.get('id');

    // buscamos esa cita en el servicio
    if (id) {
      this.cita = this.citasSrv.getAppointment(id);
    }
  }
}
