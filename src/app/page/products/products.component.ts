import { Component, inject } from '@angular/core';
import { Iproduct } from '../../models/product.model';
import { ProductService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  public products: Iproduct[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Iproduct[]) => {
      this.products = products;
      console.log(this.products, '///products');
    });
  }

  onCardClick(id: string) {
    this.router.navigate(['/products', id]);
    console.log(id, '//ID');
  }
}
