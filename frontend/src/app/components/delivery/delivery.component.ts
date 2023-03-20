import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  deliveryForm?: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const address = this.fb.group({
      city: '',
      zipCode: '',
      street: '',
      houseNumber: ''
    });
    this.deliveryForm = this.fb.group({
      name: '',
      address: address,
      email: '',
      phoneNumber: ''
    });
  }
}
