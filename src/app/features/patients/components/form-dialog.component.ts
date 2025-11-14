import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms'; // <-- Módulos de Formularios Reactivos
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogModule
} from '@angular/material/dialog'; // <-- Módulos de Diálogo

import { 
  Patient 
} from '../../patients/data/patients.types'; // <-- Tipo de Datos

import { 
  PatientsService 
} from '../../patients/data/patients.service'; // <-- Servicio (aunque solo lo usaremos para cerrar)

@Component({
  selector: 'app-patient-form-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, // Habilitar formularios reactivos
    MatButtonModule, 
    MatInputModule, 
    MatSelectModule,
    MatRadioModule,
    MatDialogModule
  ],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  patientForm: FormGroup;
  isEditMode: boolean = false;
  
  // Datos de control
  speciesOptions = ['Canino', 'Felino', 'Bovino', 'Equino', 'Otro'];
  
  // 1. Inyección de dependencias
  constructor(
    private fb: FormBuilder, // Constructor de formularios
    private dialogRef: MatDialogRef<FormDialogComponent>, // Referencia al diálogo
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, patient?: Patient }, // Datos pasados del ListComponent
    private patientsService: PatientsService // Servicio de Pacientes
  ) {
    // Inicialización del formulario
    this.patientForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.isEditMode = this.data.isEdit;
    this.initForm(this.data.patient);
  }

  // 2. Inicialización del Formulario (Define todos los campos posibles)
  initForm(patient?: Patient) {
    this.patientForm = this.fb.group({
      // CAMPOS BÁSICOS
      id: [patient?.id || null],
      isHuman: [patient?.isHuman || false],
      identificationCode: [patient?.identificationCode || '', Validators.required],
      name: [patient?.name || '', Validators.required],
      birthdate: [patient?.birthdate || '', Validators.required],
      
      // CAMPOS HUMANOS (Condicionales)
      surname: [patient?.surname || ''],
      email: [patient?.email || '', Validators.email],
      phone: [patient?.phone || ''],
      
      // CAMPOS VETERINARIOS (Condicionales)
      species: [patient?.species || null],
      breed: [patient?.breed || ''],
      ownerName: [patient?.ownerName || '']
    });
    
    // 3. Suscripción para gestionar la validación condicional (humano vs. veterinario)
    this.patientForm.get('isHuman')?.valueChanges.subscribe(isHuman => {
      this.toggleValidators(isHuman);
    });

    // Dispara la validación inicial (si está en modo edición)
    this.toggleValidators(this.patientForm.get('isHuman')?.value);
  }

  // 4. Lógica de validación condicional
  toggleValidators(isHuman: boolean): void {
    const species = this.patientForm.get('species');
    const surname = this.patientForm.get('surname');
    
    if (isHuman) {
      // Si es humano, el apellido es obligatorio.
      surname?.addValidators(Validators.required);
      species?.clearValidators();
    } else {
      // Si es animal, la especie es obligatoria.
      surname?.clearValidators();
      species?.addValidators(Validators.required);
    }
    surname?.updateValueAndValidity();
    species?.updateValueAndValidity();
  }

  // 5. Método de envío
  onSubmit(): void {
    if (this.patientForm.valid) {
      const formValue = this.patientForm.value;
      
      // Lógica de Supabase:
      console.log('Datos a enviar:', formValue);
      // Cuando tengamos el servicio real, aquí iría: this.patientsService.save(formValue)
      
      this.dialogRef.close(formValue); // Cierra y pasa los datos
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.patientForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}