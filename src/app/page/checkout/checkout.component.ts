import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService, Order, OrderItem } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cartService = inject(CartService);
  private orderService = inject(OrderService);

  checkoutForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)]]
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.controls[key].markAsTouched();
      });
      return;
    }

    if (this.cartService.cartItems().length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.isSubmitting = true;

    const orderItems: OrderItem[] = this.cartService.cartItems().map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity
    }));

    const order: Order = {
      ...this.checkoutForm.value,
      items: orderItems,
      subtotal: this.cartService.subtotal(),
      discount: this.cartService.totalDiscount(),
      total: this.cartService.total(),
      orderDate: new Date().toISOString()
    };

    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('Order created:', response);
        alert('Order placed successfully! Order ID: ' + response.id);
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error creating order:', err);
        alert('Failed to place order. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel?')) {
      this.router.navigate(['/cart']);
    }
  }
}