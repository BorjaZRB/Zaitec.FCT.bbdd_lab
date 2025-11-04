import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar { }
