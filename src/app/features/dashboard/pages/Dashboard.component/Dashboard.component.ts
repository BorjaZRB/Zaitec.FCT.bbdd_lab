import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../../shared/components/SearchBar.component/SearchBar.component';
import { AuthService } from '../../../../core/services/AuthService';
//IMPORTACIONES AÑADIDAS
import { MatGridListModule } from '@angular/material/grid-list'; // Para usar grids
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatIconModule } from '@angular/material/icon'; // Para iconos

@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, MatGridListModule, MatCardModule, MatIconModule],
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  
  // --- PROPIEDADES YA IMPLEMENTADAS EN EL DASHBOARD ---
  userName: string | null = null;
  items = ['Angular', 'React', 'Vue', 'Svelte'];
  filteredItems = [...this.items];
  
  // --- CÓDIGO FUSIONADO: PROPIEDADES DE ROLES Y TARJETAS AÑADIDOS---
  currentUserRole: string = 'administrador'; // Rol por defecto para maquetar
  currentCenter: string = 'Centro Uno'; 
  
  cards = [
    { title: 'Pacientes', content: 'Ver Listado', icon: 'group', routerLink: '/pacientes' , roles: ['trabajador', 'administrador'] },
    { title: 'Citas Pendientes', content: '12', icon: 'event', routerLink: '/calendario' , roles: ['coordinador', 'administrador'] },
    { title: 'Resultados Listos', content: '5', icon: 'check_circle', routerLink: '/resultados-analisis', roles: ['paciente', 'administrador'] },
    { title: 'Nuevo Análisis', content: 'Crear', icon: 'add_circle', routerLink: '/pacientes', roles: ['trabajador', 'administrador'] },
  ];
  // ---------------------------------------------------------
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener el usuario del localStorage (CÓDIGO YA IMPLEMENTADO)
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.nombre || user.email;
      
      // Opcional: Si el usuario ya tiene un campo 'role', lo asignamos
      // if (user.role) { this.currentUserRole = user.role; } 
    }
  }

  // --- CÓDIGO AÑADIDO ---
  showCard(card: any): boolean {
      return card.roles.includes(this.currentUserRole);
  }
  // -----------------------------------------

  // --- MÉTODOS YA IMPLEMENTADOS---
  onSearch(term: string) {
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(term.toLowerCase())
    );
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.userName = null;
    });
  }
}
