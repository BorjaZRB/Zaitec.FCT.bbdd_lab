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
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', Validators.required],
        rol: ['', Validators.required],
        centroAsignado: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmarPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  }

  async onRegister() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = { ...this.registroForm.value };
    delete payload.confirmarPassword;

    try {
      const { data, error } = await this.trabajadoresService.create(payload);
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
