import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orderItems: OrderItem[] = [];

  constructor(
    private localStorageService: LocalStorageService
    ) {}

  ngOnInit(): void {
    this.getOrderItems();
  }

  getOrderItems(): void {
    const userIdStr = this.localStorageService.getUserId();
    if(userIdStr) {
      const userId = parseInt(userIdStr);
    }
  }

  calculateTotal(): number {
    return this.orderItems.reduce((acc, curr) => acc + curr.amount * curr.product.price, 0);
  }
}
