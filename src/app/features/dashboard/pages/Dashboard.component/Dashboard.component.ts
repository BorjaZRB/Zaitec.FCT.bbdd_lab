import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../../shared/components/SearchBar.component/SearchBar.component';
import { AuthService } from '../../../../core/services/AuthService';

@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  items = ['Angular', 'React', 'Vue', 'Svelte'];
  filteredItems = [...this.items];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener el usuario del localStorage
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.nombre || user.email;
    }
  }

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
