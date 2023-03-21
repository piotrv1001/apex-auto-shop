
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "src/app/model/entities/user.model";
import { DeliveryData } from "src/app/model/types/delivery-data";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  @Output() submit: EventEmitter<DeliveryData> = new EventEmitter<DeliveryData>();
  deliveryForm?: FormGroup;
  user?: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserObs().subscribe(user => this.user = user);
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

  onSubmit(): void {
    this.submit.emit(this.deliveryForm?.value);
  }
}
