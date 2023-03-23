import { Component } from "@angular/core";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  selectedCardIndex = -1;

  updateCardIndex(index: number): void {
    this.selectedCardIndex = index;
  }
}
