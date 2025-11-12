import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService, Paciente, Centro } from '../../core/services/supabase.service';

interface ResultadoAnalisis {
  id?: number;
  tipo: 'Clínico' | 'Nutricional' | 'Radiografía';
  id_paciente: number;
  id_centro: number;
  paciente?: string;
  centro?: string;
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
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule
  ],
  templateUrl: './resultados-analisis.html',
  styleUrls: ['./resultados-analisis.scss']
})
export class ResultadosAnalisis implements OnInit {
  resultados: ResultadoAnalisis[] = [];
  pacientes: Paciente[] = [];
  centros: Centro[] = [];
  filtroTipo: string = '';
  displayedColumns: string[] = ['paciente', 'centro', 'tipo', 'fecha', 'descripcion', 'acciones'];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      // Primero cargamos pacientes y centros
      this.pacientes = await this.supabaseService.obtenerPacientes();
      this.centros = await this.supabaseService.obtenerCentros();

      // Después cargamos resultados y asignamos nombres
      await this.cargarResultados();
    } catch (error) {
      console.error('Error inicializando datos:', error);
    }
  }

  async cargarResultados() {
    try {
      const datos = await this.supabaseService.obtenerAnalisis() as ResultadoAnalisis[];

      this.resultados = datos.map(r => ({
        ...r,
        paciente: this.pacientes.find(p => p.id_paciente === r.id_paciente)
                     ? `${this.pacientes.find(p => p.id_paciente === r.id_paciente)?.nombre} ${this.pacientes.find(p => p.id_paciente === r.id_paciente)?.apellidos}`
                     : 'Sin nombre',
        centro: this.centros.find(c => c.id_centro === r.id_centro)?.nombre || 'Sin centro'
      }));
    } catch (error) {
      console.error('Error al cargar resultados desde Supabase:', error);
    }
  }

  async archivarResultado(r: ResultadoAnalisis) {
    if (!r.id) return;
    try {
      await this.supabaseService.actualizarAnalisis(r.id, { activo: false });
      r.activo = false;
    } catch (error) {
      console.error('Error al archivar resultado:', error);
    }
  }

  async reactivarResultado(r: ResultadoAnalisis) {
    if (!r.id) return;
    try {
      await this.supabaseService.actualizarAnalisis(r.id, { activo: true });
      r.activo = true;
    } catch (error) {
      console.error('Error al reactivar resultado:', error);
    }
  }

  get resultadosActivos() {
    return this.resultados
      .filter(r => r.activo)
      .filter(r => this.filtroTipo === '' || r.tipo === this.filtroTipo);
  }

  get resultadosArchivados() {
    return this.resultados
      .filter(r => !r.activo)
      .filter(r => this.filtroTipo === '' || r.tipo === this.filtroTipo);
  }
}

