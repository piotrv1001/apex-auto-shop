
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DeliveryData } from "src/app/model/types/delivery-data";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss', '../../pages/login/login.component.scss']
})
export class DeliveryComponent {

  @Output() submit: EventEmitter<DeliveryData> = new EventEmitter<DeliveryData>();
  @Input() deliveryData: DeliveryData = {};

  onSubmit(): void {
    this.submit.emit(this.deliveryData);
  }
}
