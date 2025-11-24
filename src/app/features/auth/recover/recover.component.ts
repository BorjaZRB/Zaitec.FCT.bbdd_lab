import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent {
  form!: FormGroup;
  loading = false;
  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.message = '';
    const { email } = this.form.value;
    const res = await this.auth.requestPasswordReset(email);
    this.message = res.message || 'Se han enviado instrucciones si existe la cuenta.';
    this.loading = false;
  }

  goBack() {
    this.router.navigate(['/Login']);
  }
}
