import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Necesario para el input en sí
import { MatIconModule } from '@angular/material/icon'; // Necesario para el toggle
import { MatButtonModule } from '@angular/material/button'; // Necesario para el botón de login
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  message = '';
  showPassword = false; // propiedad para alternar visibilidad

  constructor(private fb: FormBuilder, private supabase: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  //  Método para alternar visibilidad del campo contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Método que se llama al enviar el formulario de login.
  async onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.message = '';

    const { email, password } = this.loginForm.value;

    // Llama al servicio de autenticación
    const { success, message } = await this.supabase.loginCliente(email, password);

    this.message = message;
    this.loading = false;
  }
}
