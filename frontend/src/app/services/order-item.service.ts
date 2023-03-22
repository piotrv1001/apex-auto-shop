import { BASE_URL } from './../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { OrderItem } from '../model/entities/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemSerive {

  ORDER_ITEM_ROUTE = 'order_items'

  constructor(private http: HttpClient) {}

  partialUpdate(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.patch<OrderItem>(`${BASE_URL}/${this.ORDER_ITEM_ROUTE}`, orderItem);
  }

  delete(productId: number, orderId: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${this.ORDER_ITEM_ROUTE}?productId=${productId}&orderId=${orderId}`);
  }
}
