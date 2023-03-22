import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @Input() orderItem?: OrderItem;
  @Output() incrementBtnClick: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  @Output() decrementBtnClick: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  @Output() removeBtnClick: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

  increment(): void {
    this.incrementBtnClick.emit(this.orderItem);
  }

  decrement(): void {
    this.decrementBtnClick.emit(this.orderItem);
  }

  remove(): void {
    this.removeBtnClick.emit(this.orderItem);
  }
}
