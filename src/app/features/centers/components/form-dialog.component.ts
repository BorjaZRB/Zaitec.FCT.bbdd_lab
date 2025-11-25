import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { 
    MAT_DIALOG_DATA, 
    MatDialogRef, 
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions 
} from '@angular/material/dialog'; 

// --- CORRECCIÓN DE RXJS Y MANEJO ASÍNCRONO ---
import { Observable, of } from 'rxjs'; // Mantenemos Observable y of
import { CenterService, Center } from '../../../core/services/center.service'; 
import { Trabajador, TrabajadoresService } from '../../../core/services/trabajadores.service'; 
// ----------------------------------------------------

@Component({
  selector: 'app-center-form-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatSelectModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions
  ],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  centerForm: FormGroup;
  isEditMode: boolean = false;
  
  // PROPIEDAD CORREGIDA: Ahora es un array simple, NO un Observable.
  // Usaremos un array simple para cargar los datos con async/await.
  coordinators: Trabajador[] = []; 
  
  // 1. Inyección de dependencias
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, center?: Center },
    private centerService: CenterService,
    private trabajadoresService: TrabajadoresService
  ) {
    this.centerForm = this.fb.group({});
  }

  // 2. IMPLEMENTACIÓN ASÍNCRONA CORREGIDA
  async ngOnInit(): Promise<void> {
    this.isEditMode = this.data.isEdit;
    this.initForm(this.data.center);
    
    // CARGAR LISTA DE TRABAJADORES (USANDO ASYNC/AWAIT PARA RESOLVER LA PROMESA)
    const result = await this.trabajadoresService.getAll();
    
    // Asignamos el array de datos (si existe) a la propiedad 'coordinators'
    this.coordinators = result.data || []; 
  }

  // 3. Estructura del Formulario (Sin cambios)
  initForm(center?: Center) {
    this.centerForm = this.fb.group({
      id_centro: [center?.id_centro || null],
      nombre: [center?.nombre || '', Validators.required],
      direccion: [center?.direccion || '', Validators.required],
      telefono: [center?.telefono || '', Validators.required],
      coordinadorId: [center?.coordinadorId || null, Validators.required]
    });
  }

  // FALTAN LOS MÉTODOS onSubmit y onCancel
  onSubmit(): void {
    if (this.centerForm.valid) {
      const formValue = this.centerForm.value;
      // Lógica de Supabase: Guardar o Actualizar
      console.log('Datos de Centro a enviar:', formValue);
      this.dialogRef.close(formValue); 
    } else {
      this.centerForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}