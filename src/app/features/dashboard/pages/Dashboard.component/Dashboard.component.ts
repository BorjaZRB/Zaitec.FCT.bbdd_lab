import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../../shared/components/SearchBar.component/SearchBar.component';
import { AuthService } from '../../../../core/services/AuthService';
//IMPORTACIONES AÑADIDAS
import { SecurityService, UserRole } from '../../../../core/services/security.service'; // <-- Importar el nuevo servicio
//otros imports de Material
import { MatGridListModule } from '@angular/material/grid-list'; // Para usar grids
import { MatCardModule } from '@angular/material/card'; // Para tarjetas
import { MatIconModule } from '@angular/material/icon'; // Para iconos

//CREAR INTERFAZ PARA DEFINIR EL TIPO ESTRICTO DE LA TARJETA
interface DashboardCard {
  title: string;
  content: string;
  icon: string;
  routerLink: string;
  // Usamos el tipo UserRole que viene de SecurityService
  roles: UserRole[]; 
}

@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, MatGridListModule, MatCardModule, MatIconModule],
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  
  // Inyectar el servicio de seguridad
  private securityService = inject(SecurityService); // <--- INYECCIÓN DE SECURITY SERVICE
  
  // --- PROPIEDADES YA IMPLEMENTADAS EN EL DASHBOARD ---
  userName: string | null = null;
  items = ['Angular', 'React', 'Vue', 'Svelte'];
  filteredItems = [...this.items];
  

  // PROPIEDADES DE SEGURIDAD
  currentUserRole: UserRole = this.securityService.getCurrentUserRole();
  
  cards: DashboardCard[] = [
    { title: 'Pacientes', content: 'Ver Listado', icon: 'group', routerLink: '/pacientes' , roles: ['trabajador', 'administrador'] },
    { title: 'Citas Pendientes', content: '12', icon: 'event', routerLink: '/calendario' , roles: ['coordinador', 'administrador'] },
    { title: 'Resultados Listos', content: '5', icon: 'check_circle', routerLink: '/resultados-analisis', roles: ['cliente', 'administrador'] },
    { title: 'Nuevo Análisis', content: 'Crear', icon: 'add_circle', routerLink: '/pacientes', roles: ['trabajador', 'administrador'] },
    { title: 'Registro Empleado', content: 'Nuevo', icon: 'person_add', routerLink: '/registro-empleado', roles: ['administrador'] },
  ];
  
  // ---------------------------------------------------------
  
  constructor(
    private authService: AuthService
  ) {
    // Inicializar el rol inmediatamente
    this.currentUserRole = this.securityService.getCurrentUserRole();
    // Iniciar el form de búsqueda (si lo tenía dev en el constructor)
    // this.filteredItems = [...this.items]; 
  }

  ngOnInit() {
    // Código de dev para obtener el nombre de usuario
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.nombre || user.email;
      // Nota: El rol se lee en el constructor.
    }
  }

  // --- LÓGICA DE ROLES (Ya implementada, solo verificamos el tipo) ---
  showCard(card: { roles: UserRole[] }): boolean {
      return card.roles.includes(this.currentUserRole);
  }
  // ------------------------------------

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
