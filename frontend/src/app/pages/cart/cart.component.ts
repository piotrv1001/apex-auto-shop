import { DeliveryData } from './../../model/types/delivery-data';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService
    ) {}

  ngOnInit(): void {
    this.getOrderItems();
  }

  handleDeliveryFormSubmisssion(deliveryData: DeliveryData): void {
    console.log('data', deliveryData);
  }

  getOrderItems(): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.orderService.getOrdersForUser(userId, true).subscribe(orders => {
        const order = orders[0];
        this.orderItems = order.orderItems;
      })
    }
  }

  calculateTotal(): number {
    return this.orderItems.reduce((acc, curr) => acc + curr.amount * curr.product.price, 0);
  }
}
