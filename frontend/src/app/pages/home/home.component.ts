import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.orderService.getOrdersForUser(userId, true).subscribe(orders => {
        this.cartService.notifyAboutCartItemAmount(orders[0].orderItems.length);
      })
    }
  }

}
