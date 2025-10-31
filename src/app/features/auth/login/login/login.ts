import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
// Componente de login que utiliza un formulario reactivo para capturar email y contraseña.
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  message = '';

  // Inyecta FormBuilder para crear el formulario y AuthService para manejar la autenticación.
  constructor(private fb: FormBuilder, private supabase: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  // Método que se llama al enviar el formulario de login.
    async onLogin() {
    this.loading = true;
    this.message = '';

 // Extrae email y password del formulario y llama al método de login del servicio de autenticación.

    const { email, password } = this.loginForm.value;

 // Llama al servicio de autenticación para iniciar sesión.

    const { success, message } = await this.supabase.loginCliente(email, password);

  // Actualiza el estado del componente basado en el resultado del login.
    this.message = message;
    this.loading = false;
  }
}
