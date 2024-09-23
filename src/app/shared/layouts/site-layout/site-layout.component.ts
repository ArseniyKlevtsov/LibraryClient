import { AuthService } from './../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-site-layout',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule],
  templateUrl: './site-layout.component.html',
  styleUrl: './site-layout.component.css'
})
export class SiteLayoutComponent {
  itemsCount: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService) {

    this.cartService.itemsCount$.subscribe(count => {
      this.itemsCount = count;
    });
  }

  menuItems = [
    { url: '/userProfile', name: 'My profile' },
    { url: '/authors', name: 'Authors' },
    { url: '/books', name: 'Books' },
    { url: '/genres', name: 'Genres' },
    { url: '/cart', name: 'Cart' },
  ];

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
