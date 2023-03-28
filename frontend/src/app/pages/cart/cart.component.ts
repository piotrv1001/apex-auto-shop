import { DeliveryData } from './../../model/types/delivery-data';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";
import { OrderService } from 'src/app/services/order.service';
import { OrderItemSerive } from 'src/app/services/order-item.service';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/model/entities/order.model';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss', '../login/login.component.scss']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];
  order?: Order;
  totalNoTax: number = 0;
  totalWithTax: number = 0;
  tax: number = 0;
  orderDeliveryData: DeliveryData = {};

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private orderItemService: OrderItemSerive,
    private cartService: CartService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getOrderItems();
  }

  navigateHome(): void {
    this.router.navigate(['/']);
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

  handleDeliveryFormSubmisssion(deliveryData: DeliveryData, stepper: MatStepper): void {
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
      stepper.next();
    }
  }

  handleDonePayment(): void {
    const randomOrderNumber = this.generateRandomOrderNumber(10);
    if(this.order?.active != null && this.order) {
      this.order.orderNumber = randomOrderNumber;
      this.order.active = false;
      this.unsetOrderItems(this.order);
      this.orderService.partialUpdate(this.order).subscribe((order: Order) => {
        this.order = order;
      });
    }
  }

  getOrderItems(): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.orderService.getOrdersForUser(userId, true).subscribe(orders => {
        this.order = orders[0];
        this.orderDeliveryData = {
          address: {
            city: this.order.city,
            street: this.order.street,
            houseNumber: this.order.houseNumber,
            zipCode: this.order.zipCode
          },
          name: this.order.name,
          email: this.order.email,
          phoneNumber: this.order.phoneNumber
        }
        this.orderItems = this.order.orderItems ?? [];
        this.calculateTotal();
      })
    }
  }

  private calculateTotal(): void {
    this.totalNoTax = this.orderItems.reduce((acc, curr) => acc + curr.amount * curr.product.price, 0);
    this.tax = 0.23 * this.totalNoTax;
    this.totalWithTax = this.totalNoTax + this.tax;
  }

  private partialUpdate(orderItem: OrderItem): void {
    this.orderItemService.partialUpdate(orderItem).subscribe(updatedOrderItem => {
      console.log('updated', updatedOrderItem);
    });
  }

  private orderUpdate(order: Order): void {
    this.unsetOrderItems(order);
    this.orderService.partialUpdate(order).subscribe(updatedOrder => {
      this.order = updatedOrder;
    })
  }

  private unsetOrderItems(order: Order): void {
    if(order?.orderItems != null) {
      order.orderItems = undefined;
    }
  }

  private generateRandomOrderNumber(length: number) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
