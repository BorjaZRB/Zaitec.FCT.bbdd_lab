import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/AuthService';

interface Usuario {
  nombre?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  fecha_nacimiento?: string;
  telefono?: string;
  phone?: string;
  email?: string;
  password?: string;
  centro?: string;
  especialidad?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const u = localStorage.getItem('usuario');
    if (u) {
      try {
        this.usuario = JSON.parse(u);
      } catch (e) {
        this.usuario = { email: u } as Usuario;
      }
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
    } finally {
      // limpiar localStorage y redirigir al login
      localStorage.removeItem('usuario');
      this.router.navigate(['/Login']);
    }
  }
}
