import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SupabaseService, Paciente, Centro } from '../../core/services/supabase.service';

interface ResultadoAnalisis {
  tipo: 'Clínico' | 'Nutricional' | 'Radiografía';
  id_paciente: number;
  id_centro: number;
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
export class AnalisisComponent implements OnInit {
  resultados: ResultadoAnalisis[] = [];
  pacientes: Paciente[] = [];
  centros: Centro[] = [];

  nuevoResultado: ResultadoAnalisis = {
    tipo: 'Clínico',
    id_paciente: null!,
    id_centro: null!,
    fecha: '',
    descripcion: '',
    activo: true,
  };

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.cargarPacientes();
    this.cargarCentros();
  }

  async cargarPacientes() {
    try {
      this.pacientes = await this.supabaseService.obtenerPacientes();
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  }

  async cargarCentros() {
    try {
      this.centros = await this.supabaseService.obtenerCentros();
    } catch (error) {
      console.error('Error al cargar centros:', error);
    }
  }

  async agregarResultado() {
    if (!this.nuevoResultado.id_paciente || !this.nuevoResultado.id_centro || !this.nuevoResultado.fecha) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    try {
      await this.supabaseService.agregarAnalisis(this.nuevoResultado);
      alert('✅ Resultado guardado correctamente en Supabase.');
      this.resultados.push({ ...this.nuevoResultado });

      // Reiniciar formulario
      this.nuevoResultado = {
        tipo: 'Clínico',
        id_paciente: null!,
        id_centro: null!,
        fecha: '',
        descripcion: '',
        activo: true,
      };
    } catch (error) {
      console.error('Error al guardar en Supabase:', error);
      alert('❌ Error al guardar el resultado en Supabase.');
    }
  }
}
