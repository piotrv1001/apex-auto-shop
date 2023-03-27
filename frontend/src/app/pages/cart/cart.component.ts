import { DeliveryData } from './../../model/types/delivery-data';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";
import { OrderService } from 'src/app/services/order.service';
import { OrderItemSerive } from 'src/app/services/order-item.service';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/model/entities/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss', '../login/login.component.scss']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];
  order?: Order;

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
    if(this.order) {
      const { name, email, phoneNumber, address } = deliveryData;
      if(address) {
        const { street, zipCode, city, houseNumber } = address;
        this.order.street = street;
        this.order.zipCode = zipCode;
        this.order.city = city;
        this.order.houseNumber = houseNumber;
      }
      this.order.name = name;
      this.order.email = email;
      this.order.phoneNumber = phoneNumber;
      this.order.name = name;
      this.orderUpdate(this.order);
    }
  }

  getOrderItems(): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.orderService.getOrdersForUser(userId, true).subscribe(orders => {
        this.order = orders[0];
        this.orderItems = this.order.orderItems ?? [];
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

  private orderUpdate(order: Order): void {
    console.log('order', order);
    this.orderService.partialUpdate(order).subscribe(updatedOrder => {
      this.order = updatedOrder;
    })
  }
}
