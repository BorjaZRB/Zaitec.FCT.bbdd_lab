import { Component, inject } from '@angular/core';
import { CitasListPage } from "../list/citas-list.page";
import { Cita } from '../../types';
import { CitasCalendarioComponent } from '../calendario/citas-calendar/citas-calendario';
import { CitasAdd } from "../../components/citas-add/citas-add";
import { CitaService } from '../../../../core/services/CitasService.service';

@Component({
  selector: 'app-citas',
  imports: [CitasListPage, CitasCalendarioComponent, CitasAdd],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.scss'
})

// 3. CLASE
export class CitasComponent {

  private citaService = inject(CitaService)

    async onNuevaCita(cita: Omit<Cita, 'id_cita'>) {
    await this.citaService.addCita(cita);
    }


}
