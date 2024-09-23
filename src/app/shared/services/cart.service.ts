import { Injectable, OnInit } from '@angular/core';
import { CartRentedBook } from '../interfaces/rented-book/cart-rented-book.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartRentedBook[] = [];
  private itemsCountSubject = new BehaviorSubject<number>(0);

  itemsCount$ = this.itemsCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  addToCart(cartRentedBook: CartRentedBook) {
    const existingItem = this.items.find(item => item.book.id === cartRentedBook.book.id);

    if (existingItem) {
      existingItem.booksCount += cartRentedBook.booksCount;
    } else {
      this.items.push(cartRentedBook);
    }
    this.updateItemsCount();
    this.saveCart()
  }

  increase(item: CartRentedBook) {
    const existingItem = this.items.find(i => i.book.id === item.book.id);
    if (existingItem) {
      existingItem.booksCount += 1;
      this.updateItemsCount();
      this.saveCart();
    }
  }

  decrease(item: CartRentedBook) {
    const existingItem = this.items.find(i => i.book.id === item.book.id);
    if (existingItem && existingItem.booksCount > 1) {
      existingItem.booksCount -= 1;
      this.updateItemsCount();
      this.saveCart();
    } else if (existingItem && existingItem.booksCount === 1) {
      this.removeItem(existingItem);
    }
  }

  private removeItem(item: CartRentedBook) {
    this.items = this.items.filter(i => i.book.id !== item.book.id);
    this.updateItemsCount();
    this.saveCart();
  }

  getItemCount(): number {
    return this.items.length;
  }

  getItems(): CartRentedBook[] {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.updateItemsCount();
    this.saveCart();
  }

  private updateItemsCount() {
    const totalCount = this.items.reduce((count, item) => count + item.booksCount, 0);
    this.itemsCountSubject.next(totalCount);
  }

  private saveCart() {
    const cartData = JSON.stringify(this.items);
    localStorage.setItem('cart', cartData);
  }

  private loadCart() {
    const savedCartData = localStorage.getItem('cart');
    this.items = savedCartData ? JSON.parse(savedCartData) : [];
    this.updateItemsCount();
  }

}
