
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<any[]>([]);
  
  get cartCount() {
    return this.cartItems().length;
  }

  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
  }

  removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}