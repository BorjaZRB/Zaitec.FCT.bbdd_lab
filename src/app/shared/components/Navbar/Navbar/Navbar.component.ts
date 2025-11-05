import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class Navbar implements OnInit, OnDestroy {
  userName: string | null = null;
  private authSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el usuario del localStorage inicialmente
    this.updateUserFromStorage();

    // Suscribirse a cambios de autenticación para actualizar el nombre
    this.authSub = this.authService.authState.subscribe((isAuth) => {
      if (isAuth) {
        this.updateUserFromStorage();
      } else {
        this.userName = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
  }

  private updateUserFromStorage() {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userName = user?.nombre || user?.email || null;
      } catch {
        this.userName = null;
      }
    } else {
      this.userName = null;
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
