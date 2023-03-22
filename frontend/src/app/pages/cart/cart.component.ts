import { DeliveryData } from './../../model/types/delivery-data';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";
import { OrderService } from 'src/app/services/order.service';
import { OrderItemSerive } from 'src/app/services/order-item.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private orderItemService: OrderItemSerive,
    private cartService: CartService
    ) {}

  ngOnInit(): void {
    this.getOrderItems();
  }

  handleIncrement(orderItem: OrderItem): void {
    orderItem.amount++;
    this.partialUpdate(orderItem);
  }

  handleDecrement(orderItem: OrderItem): void {
    orderItem.amount--;
    this.partialUpdate(orderItem);
  }

  handleRemove(orderItem: OrderItem): void {
    const { productId, orderId } = orderItem
    this.orderItemService.delete(productId, orderId).subscribe(() => {
      const index = this.orderItems.indexOf(orderItem);
      this.orderItems.splice(index, 1);
      this.cartService.notifyAboutCartItemAmount(this.orderItems.length);
    });
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

  private partialUpdate(orderItem: OrderItem): void {
    this.orderItemService.partialUpdate(orderItem).subscribe(updatedOrderItem => {
      console.log('updated', updatedOrderItem);
    });
  }
}
