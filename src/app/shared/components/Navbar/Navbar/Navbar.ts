import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './Navbar.html',
  styleUrls: ['./Navbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar { }
