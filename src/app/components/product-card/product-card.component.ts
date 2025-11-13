//import { Component, input, output } from '@angular/core';
//import { Iproduct } from '../../models/product.model';


//@Component({
 // selector: 'app-product-card',
 // imports: [],
 // templateUrl: './product-card.component.html',
 // styleUrl: './product-card.component.scss'
//})
//export class ProductCardComponent {
 //public product=input.required<Iproduct>();
 //public cardClick =output<void>();
//}

import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Iproduct;
  @Output() cardClick = new EventEmitter<string>();
  
  cartService = inject(CartService);

  viewDetails() {
    this.cardClick.emit(this.product.id);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}