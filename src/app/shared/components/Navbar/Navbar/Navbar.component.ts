import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar { }
