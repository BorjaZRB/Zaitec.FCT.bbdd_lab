import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [CommonModule, FormsModule, MatCardModule, MatSelectModule, MatTableModule, MatTabsModule, MatButtonModule],
  templateUrl: './resultados-analisis.html',
  styleUrls: ['./resultados-analisis.scss']
})
export class ResultadosAnalisis {
  resultados: ResultadoAnalisis[] = [
    { tipo: 'Clínico', paciente: 'Juan Pérez', fecha: '2025-11-10', descripcion: 'Análisis general', activo: true },
    { tipo: 'Nutricional', paciente: 'María López', fecha: '2025-11-09', descripcion: 'Revisión dieta', activo: true },
    { tipo: 'Radiografía', paciente: 'Carlos Díaz', fecha: '2025-11-08', descripcion: 'Radiografía torácica', activo: false }
  ];

  filtroTipo: string = '';

  displayedColumns: string[] = ['paciente', 'tipo', 'fecha', 'descripcion', 'acciones'];

  archivarResultado(r: ResultadoAnalisis) { r.activo = false; }
  reactivarResultado(r: ResultadoAnalisis) { r.activo = true; }

  get resultadosActivos() { return this.resultados.filter(r => r.activo).filter(r => this.filtroTipo === '' || r.tipo === this.filtroTipo); }
  get resultadosArchivados() { return this.resultados.filter(r => !r.activo).filter(r => this.filtroTipo === '' || r.tipo === this.filtroTipo); }
}
