import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

interface ResultadoAnalisis {
  tipo: 'Clínico' | 'Nutricional' | 'Radiografía';
  paciente: string;
  fecha: string;
  descripcion: string;
  activo: boolean;
}

@Component({
  selector: 'app-resultados-analisis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
  ],
  templateUrl: './resultados-analisis.html',
  styleUrls: ['./resultados-analisis.scss'],
})
export class ResultadosAnalisis {
  resultados: ResultadoAnalisis[] = [];
  nuevoResultado: ResultadoAnalisis = {
    tipo: 'Clínico',
    paciente: '',
    fecha: '',
    descripcion: '',
    activo: true,
  };

  displayedColumns: string[] = ['paciente', 'tipo', 'fecha', 'descripcion', 'acciones'];

  agregarResultado() {
    if (!this.nuevoResultado.paciente || !this.nuevoResultado.fecha) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    this.resultados.push({ ...this.nuevoResultado });
    this.nuevoResultado = {
      tipo: 'Clínico',
      paciente: '',
      fecha: '',
      descripcion: '',
      activo: true,
    };
  }

  archivarResultado(r: ResultadoAnalisis) {
    r.activo = false;
  }

  reactivarResultado(r: ResultadoAnalisis) {
    r.activo = true;
  }

  get resultadosActivos() {
    return this.resultados.filter(r => r.activo);
  }

  get resultadosArchivados() {
    return this.resultados.filter(r => !r.activo);
  }
}
