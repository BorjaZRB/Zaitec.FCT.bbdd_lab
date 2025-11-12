import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

interface ResultadoAnalisis {
  tipo: 'Clínico' | 'Nutricional' | 'Radiografía';
  paciente: string;
  fecha: string;
  descripcion: string;
  activo: boolean;
}

@Component({
  selector: 'app-analisis',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './analisis.html',
  styleUrls: ['./analisis.scss']
})
export class AnalisisComponent {
  resultados: ResultadoAnalisis[] = [];

  nuevoResultado: ResultadoAnalisis = {
    tipo: 'Clínico',
    paciente: '',
    fecha: '',
    descripcion: '',
    activo: true,
  };

  agregarResultado() {
    if (!this.nuevoResultado.paciente || !this.nuevoResultado.fecha) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    this.resultados.push({ ...this.nuevoResultado });
    alert('Resultado agregado correctamente.');

    // Reinicio el formulario
    this.nuevoResultado = {
      tipo: 'Clínico',
      paciente: '',
      fecha: '',
      descripcion: '',
      activo: true,
    };
  }
}


