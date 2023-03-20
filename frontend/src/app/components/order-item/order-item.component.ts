import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderItem } from "src/app/model/entities/order-item.model";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @Input() orderItem?: OrderItem;
  @Output() incrementBtnClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() decrementBtnClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeBtnClick: EventEmitter<void> = new EventEmitter<void>();

  increment(): void {
    this.incrementBtnClick.emit();
  }

  decrement(): void {
    this.decrementBtnClick.emit();
  }

  remove(): void {
    this.removeBtnClick.emit();
  }
}
