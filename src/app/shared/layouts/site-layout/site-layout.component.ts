import { AuthService } from './../../services/auth.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css'
})
export class SiteLayoutComponent {
  constructor (private authService: AuthService, private router: Router) {

  }

  menuItems = [
    { url: '/userProfile', name: 'My profile' },
    { url: '/authors', name: 'Authors' },
    { url: '/books', name: 'Books' },
    { url: '/genres', name: 'Genres' },
  ];

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
