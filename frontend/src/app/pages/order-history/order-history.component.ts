import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/model/entities/order.model";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.orderService.getOrdersForUser(userId, false).subscribe((orders: Order[]) => {
        this.orders = orders;
        console.log('orders', orders);
      });
    }
  }
}
