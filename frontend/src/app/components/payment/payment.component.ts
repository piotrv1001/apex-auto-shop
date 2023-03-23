import { PaymentState } from './../../model/types/payment-state';
import { Component } from "@angular/core";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  selectedCardIndex = -1;
  paymentState: PaymentState = PaymentState.IN_PROGRESS;

  updateCardIndex(index: number): void {
    this.selectedCardIndex = index;
  }

  simulatePayment(): void {
    this.paymentState = PaymentState.PAYING;
    setTimeout(() => {
      this.paymentState = PaymentState.DONE;
    }, 5000);
  }
}
