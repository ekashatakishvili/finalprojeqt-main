
import { Injectable, signal, computed } from '@angular/core';
import { Iproduct } from '../models/product.model';

export interface CartItem {
  product: Iproduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  
  cartCount = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  subtotal = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  });

  totalDiscount = computed(() => {
    return this.cartItems().reduce((total, item) => {
      if (item.product.originalPrice) {
        const discount = (item.product.originalPrice - item.product.price) * item.quantity;
        return total + discount;
      }
      return total;
    }, 0);
  });

  total = computed(() => {
    return this.subtotal();
  });

  addToCart(product: Iproduct) {
    const existingItem = this.cartItems().find(item => item.product.id === product.id);
    
    if (existingItem) {
      this.increaseQuantity(product.id);
    } else {
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  increaseQuantity(productId: string) {
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: string) {
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}