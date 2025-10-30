import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common'; 

// --- Módulos de Angular Material ---
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  // 1. AMPLIACIÓN DE IMPORTS (Para añadir todos los módulos)
  imports: [
    CommonModule, // Necesario para pipes como 'titlecase'
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [TitleCasePipe] // <-- Proveedor de pipe para el ejemplo
})
// 2. AMPLIACIÓN DE LA CLASE (Para añadir propiedades y métodos)
export class HomeComponent {
  // Simulación de los datos del usuario logueado (en el futuro vendrá del AuthService)
  currentUserRole: string = 'administrador'; // Establecer un rol por defecto para maquetar
  currentUserName: string = 'Malakai Villegas';
  currentCenter: string = 'Centro Sevilla'; // Simulación

  // Estructura del dashboard (ajustada para el rol)
  cols: number = 3; // Número de columnas en desktop

  cards = [
    { title: 'Citas Pendientes', content: '12', cols: 1, rows: 1, icon: 'event', roles: ['coordinador', 'administrador'] },
    { title: 'Resultados Listos', content: '5', cols: 1, rows: 1, icon: 'check_circle', roles: ['paciente', 'administrador'] },
    { title: 'Nuevo Análisis', content: 'Crear', cols: 1, rows: 1, icon: 'add_circle', roles: ['trabajador', 'administrador'] },
    { title: 'Estadísticas del Centro', content: 'Gráfico', cols: 3, rows: 2, icon: 'analytics', roles: ['coordinador', 'administrador'] },
  ];

  /* El servicio de autenticación se encargará del logout. 
  Solo definimos el método para el HTML.*/
  logout() {
    console.log('Logout solicitado. (Lógica a implementar por el AuthService)');
    // En el futuro: this.authService.signOut();
  }

  // Método para controlar qué tarjetas se muestran según el rol
  showCard(card: any): boolean {
    return card.roles.includes(this.currentUserRole);
  }
}