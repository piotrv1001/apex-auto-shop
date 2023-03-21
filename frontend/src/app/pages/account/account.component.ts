import { LocalStorageService } from './../../services/local-storage.service';
import { DeliveryData } from 'src/app/model/types/delivery-data';
import { Component, OnInit } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/entities/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser?: User;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  handleDevlieryFormSubmission(deliveryData: DeliveryData): void {
    this.updateUserDeliveryData(deliveryData);
  }

  private loadUserData(): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.userService.notifyAboutUser(user);
        }
      })
    }
  }

  private updateUserDeliveryData(deliveryData: DeliveryData): void {
    const userId = this.localStorageService.getUserId();
    if(userId && deliveryData.address) {
      const { name, email, phoneNumber } = deliveryData;
      const { city, street, houseNumber, zipCode } = deliveryData.address;
      const user = {
        id: userId,
        city,
        street,
        houseNumber,
        zipCode,
        name,
        email,
        phoneNumber
      };
      this.userService.partialUpdate(user).subscribe({
        next: () => {
          const message = 'Your data has been updated!';
          const action = 'OK';
          const durationInSeconds = 5;
          this.snackBar.open(message, action, {
            duration: durationInSeconds * 1000
          });
        }
      });
    }

  }

}
