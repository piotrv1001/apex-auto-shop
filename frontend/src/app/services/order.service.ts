import { BASE_URL } from './../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Order } from '../model/entities/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ORDER_ROUTE = 'orders'

  constructor(private http: HttpClient) {}

  getOrdersForUser(userId: number, active?: boolean): Observable<Order[]> {
    const activeStr = active ? 'true' : 'false';
    return this.http.get<Order[]>(`${BASE_URL}/${this.ORDER_ROUTE}?userId=${userId}&active=${activeStr}`);
  }

  partialUpdate(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${BASE_URL}/${this.ORDER_ROUTE}`, order);
  }
}
