import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrabajadoresService } from '../../core/services/trabajadores.service';

@Component({
  selector: 'app-registro-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './registroEmpleado.component.html',
  styleUrls: ['./registroEmpleado.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroEmpleado {
  registroForm: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private trabajadoresService: TrabajadoresService, private router: Router) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
  dni: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
  telefono: ['', Validators.required],
        contraseña: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', Validators.required],
        puesto_trabajo: ['', Validators.required],
        centroAsignado: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const pw = group.get('contraseña')?.value;
    const cpw = group.get('confirmarPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  }

  async onRegister() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    // Map form values to the 'trabajadores' table columns
    const fv = this.registroForm.value;
    // Normalize centro id: if the form gives a numeric string, convert to number.
    let idCentro: number | null = null;
    if (fv.centroAsignado != null && fv.centroAsignado !== '') {
      const maybeNum = Number(fv.centroAsignado);
      idCentro = Number.isNaN(maybeNum) ? null : maybeNum;
    }

    // Sanitize telefono: remove non-digits and convert to number if possible.
    let telefonoValor: number | null = null;
    if (fv.telefono != null && fv.telefono !== '') {
      const telefonoStr = String(fv.telefono).trim();
      // If user accidentally typed an email into the telefono field, reject early.
      if (telefonoStr.includes('@')) {
        this.errorMessage = 'Teléfono inválido: contiene un correo electrónico.';
        this.loading = false;
        return;
      }
      const digits = telefonoStr.replace(/\D+/g, '');
      telefonoValor = digits.length > 0 ? Number(digits) : null;
      if (telefonoValor !== null && Number.isNaN(telefonoValor)) telefonoValor = null;
    }

    const trabajadorPayload: any = {
      id_centro: idCentro,
      id_coordinador: null,
      nombre: fv.nombre,
      apellidos: fv.apellidos,
      telefono: telefonoValor,
      puesto_trabajo: fv.puesto_trabajo,
      email: fv.email,
      dni: fv.dni,
      // Generate a numeric id_trabajador client-side if DB doesn't auto-generate it
      id_trabajador: Math.floor(Date.now() / 1000),
      contraseña: fv.contraseña,
    };

    // Remove undefined/null fields that should be omitted
    Object.keys(trabajadorPayload).forEach((k) => {
      if (trabajadorPayload[k] === undefined) delete trabajadorPayload[k];
    });

    console.log('RegistroEmpleado - payload a insertar:', trabajadorPayload);

    try {
      const { data, error } = await this.trabajadoresService.create(trabajadorPayload);
      if (error) {
        console.error('Error creando trabajador', error);
        this.errorMessage = error.message || 'Error al crear trabajador';
        return;
      }

      this.successMessage = 'Empleado creado correctamente';
      // opcional: navegar al dashboard o limpiar el formulario
      this.registroForm.reset();
      // navegar al dashboard después de 1s
      setTimeout(() => this.router.navigate(['/dashboard']), 800);
    } catch (err: any) {
      console.error('Error registrando empleado', err);
      this.errorMessage = err?.message || 'Error inesperado';
    } finally {
      this.loading = false;
    }
  }
}
