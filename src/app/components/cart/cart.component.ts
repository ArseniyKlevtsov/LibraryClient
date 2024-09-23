import { NgFor, NgIf } from '@angular/common';
import { CartService } from './../../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartRentedBook } from '../../shared/interfaces/rented-book/cart-rented-book.interface';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { MaterialService } from '../../shared/services/material.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  items: CartRentedBook[] = [];

  public constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  increase(item: CartRentedBook) {
    this.cartService.increase(item)
  }

  decrease(item: CartRentedBook) {
    this.cartService.decrease(item);
    if (item.booksCount === 1) {
      this.items = this.cartService.getItems();
    }
  }

  placeOrder() {
    this.orderService.placeOrder(this.items).subscribe({
      next: () => {
        this.clearCart();
        MaterialService.toast('the order has been placed');
        this.router.navigate(['/userProfile']);
      },
      error: (err) => {
        MaterialService.toast('Error when placing an order');
      }
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }
}
