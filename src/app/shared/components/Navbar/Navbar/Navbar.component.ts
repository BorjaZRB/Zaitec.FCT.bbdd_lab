import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/AuthService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {
  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el usuario del localStorage
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.nombre || user.email;
    }
  }

  async onLogout(event: Event) {
    event.preventDefault();
    const { success } = await this.authService.logout();
    if (success) {
      this.userName = null;
      await this.router.navigate(['/Login']);
      window.location.reload(); // Forzar recarga para actualizar el estado
    }
  }
}
