import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders';

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
}