//import { HttpClient } from '@angular/common/http';
//import { inject, Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
//import { Iproduct } from '../models/product.model';

//@Injectable({
 // providedIn: 'root'
//})
//export class ProductsService {
//private http=inject(HttpClient);

//getProducts():Observable <Iproduct[]> {
  //return this.http.get<Iproduct[]>('http://localhost:3000/products');
//}
//}


// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Iproduct } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private http = inject(HttpClient);
//   private apiUrl = 'http://localhost:3000/products';

//   getProducts(): Observable<Iproduct[]> {
//     return this.http.get<Iproduct[]>(this.apiUrl);
//   }

//   getProduct(id: string): Observable<Iproduct> {
//     return this.http.get<Iproduct>(`${this.apiUrl}/${id}`);
//   }

//   searchProducts(query: string): Observable<Iproduct[]> {
//     return this.http.get<Iproduct[]>(`${this.apiUrl}?name_like=${query}`);
//   }
// }


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products';

  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.apiUrl}/${id}`);
  }

  searchProducts(query: string): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(`${this.apiUrl}?name_like=${query}`);
  }
}