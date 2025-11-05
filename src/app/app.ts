import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/Navbar/Navbar/Navbar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/AuthService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [Navbar, RouterOutlet, CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Comprobar el estado inicial de autenticación
    this.checkAuthStatus();

    // Suscribirse a cambios en el estado de autenticación
    this.authSubscription = this.authService.authState.subscribe(
      isAuthenticated => {
        console.log('Auth state changed:', isAuthenticated); // Debug log
        this.isLoggedIn = isAuthenticated;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private checkAuthStatus() {
    const userStr = localStorage.getItem('usuario');
    this.isLoggedIn = !!userStr;
    console.log('Initial auth status:', this.isLoggedIn); // Debug log
    this.cdr.detectChanges(); // Forzar la detección de cambios inicial
  }
}
