import { BASE_URL } from './../app.constants';
import { OrderItem } from './../model/entities/order-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  CART_ROUTE = 'cart';
  private cartItemAmountSub: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  addItemToCart(productId: number, userId: number): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${BASE_URL}/${this.CART_ROUTE}?userId=${userId}&productId=${productId}`, null);
  }

  getCartItemAmountObs(): Observable<number> {
    return this.cartItemAmountSub.asObservable();
  }

  notifyAboutCartItemAmount(amount: number): void {
    this.cartItemAmountSub.next(amount);
  }

  getAmountForOrder(orderId: number): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/${this.CART_ROUTE}/count?orderId=${orderId}`);
  }
}
