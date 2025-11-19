import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SupabaseAnalisisService, ResultadoAnalisis, Paciente } from './supabase-analisis-resultados';

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
export class ResultadosAnalisis implements OnInit {
  resultados: ResultadoAnalisis[] = [];
  nuevoResultado: ResultadoAnalisis = { tipo: 'Clínico', pacienteId: 0, fecha: '', descripcion: '', activo: true };

  filtroPacienteId: number | null = null;
  filtroTipo: string = '';

  listaPacientes: Paciente[] = [];
  listaTipos: string[] = ['Clínico', 'Nutricional', 'Radiografía'];

  displayedColumns: string[] = ['paciente', 'tipo', 'fecha', 'descripcion'];

  constructor(private analisisService: SupabaseAnalisisService) {}

  async ngOnInit() {
    await this.cargarPacientes();
    await this.cargarResultados();
    await this.cargarTipos();
  }

  async cargarPacientes() {
    try {
      this.listaPacientes = await this.analisisService.obtenerPacientes();
    } catch (error) {
      console.error('Error cargando pacientes:', error);
    }
  }

  async cargarTipos() {
    try {
      this.listaTipos = await this.analisisService.obtenerTiposAnalisis();
    } catch (error) {
      console.error('Error cargando tipos de análisis:', error);
    }
  }

  async cargarResultados() {
    try {
      this.resultados = await this.analisisService.obtenerAnalisis();
    } catch (error) {
      console.error('Error cargando resultados:', error);
    }
  }

  async agregarResultado() {
    if (!this.nuevoResultado.pacienteId || !this.nuevoResultado.fecha) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    try {
      await this.analisisService.agregarAnalisis(this.nuevoResultado);
      await this.cargarResultados();
      this.nuevoResultado = { tipo: 'Clínico', pacienteId: 0, fecha: '', descripcion: '', activo: true };
    } catch (error) {
      console.error('Error agregando resultado:', error);
    }
  }

  get resultadosFiltrados() {
    return this.resultados.filter(r =>
      r.activo &&
      (!this.filtroPacienteId || r.paciente?.id_paciente === this.filtroPacienteId) &&
      (!this.filtroTipo || r.tipo === this.filtroTipo)
    );
  }
}
