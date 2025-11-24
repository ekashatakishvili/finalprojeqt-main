
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Iproduct } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  cartService = inject(CartService);

  product: Iproduct | null = null;
  selectedImage: string = '';
  loading: boolean = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (data: Iproduct) => {
          this.product = data;
          this.selectedImage = data.image;
          this.loading = false;
          console.log('Product loaded:', data);
        },
        error: (err: any) => {
          console.error('Error loading product:', err);
          this.loading = false;
        }
      });
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Product added to cart!');
    }
  }

  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.router.navigate(['/checkout']);
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}