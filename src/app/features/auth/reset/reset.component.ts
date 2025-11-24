import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  message = '';

  canReset = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required],
    });

    // Intentar recuperar tokens desde query params o fragment
    const qp = this.route.snapshot.queryParamMap;
    let access = qp.get('access_token');
    let refresh = qp.get('refresh_token');

    if (!access) {
      const frag = this.route.snapshot.fragment || window.location.hash.replace(/^#/, '');
      if (frag) {
        const params = new URLSearchParams(frag);
        access = params.get('access_token') || params.get('accessToken');
        refresh = params.get('refresh_token') || params.get('refreshToken');
      }
    }

    if (access) {
      const res = await this.auth.setSessionFromTokens(access, refresh);
      if (res.success) {
        this.canReset = true;
        this.message = 'Sesión restaurada. Ahora puedes cambiar tu contraseña.';
      } else {
        this.message = res.message || 'No se pudo restaurar la sesión.';
      }
    } else {
      // Si no hay token, no permitimos reset
      this.message = 'Token de recuperación no encontrado o inválido. Solicita un nuevo enlace.';
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const { password, confirm } = this.form.value;
    if (password !== confirm) {
      this.message = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    const res = await this.auth.confirmPasswordReset(password);
    this.message = res.message || 'Resultado desconocido.';
    this.loading = false;

    if (res.success) {
      setTimeout(() => this.router.navigate(['/Login']), 1200);
    }
  }
}
