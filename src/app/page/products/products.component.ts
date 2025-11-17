import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../models/product.model';
import { ProductService } from '../../services/products.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  public products: Iproduct[] = [];
  public filteredProducts: Iproduct[] = [];
  public searchTerm: string = '';

  ngOnInit() {
    // Load all products
    this.productService.getProducts().subscribe((products: Iproduct[]) => {
      this.products = products;
      this.filteredProducts = products;
      console.log(this.products, '///products');
    });

    // Listen to search query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.filterProducts();
    });
  }

  filterProducts() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onCardClick(id: string) {
    this.router.navigate(['/products', id]);
    console.log(id, '//ID');
  }
}