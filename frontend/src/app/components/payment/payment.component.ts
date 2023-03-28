import { PaymentState } from './../../model/types/payment-state';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order } from 'src/app/model/entities/order.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../../pages/login/login.component.scss']
})
export class PaymentComponent {

  selectedCardIndex = -1;
  paymentState: PaymentState = PaymentState.IN_PROGRESS;
  @Output() donePayment: EventEmitter<void> = new EventEmitter<void>();
  @Input() order?: Order;

  updateCardIndex(index: number): void {
    this.selectedCardIndex = index;
  }

  simulatePayment(): void {
    this.paymentState = PaymentState.PAYING;
    setTimeout(() => {
      this.paymentState = PaymentState.DONE;
      this.donePayment.emit();
    }, 5000);
  }
}
