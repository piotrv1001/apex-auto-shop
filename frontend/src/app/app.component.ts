import { LocalStorageService } from './services/local-storage.service';
import { JwtPayload } from './model/types/jwt-payload';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/auth/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  createNewAccount = false;
  authSub?: Subscription;
  orderAmountSub?: Subscription;
  orderAmount: number = 0;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (payload: JwtPayload) => {
        this.isAuthenticated = true;
        this.localStorageService.saveUserId(payload.id);
      },
      error: (error) => {
        this.isAuthenticated = false;
        console.log(error)
      }
    });
    this.authSub = this.authService.getAuthObs().subscribe(auth => {
      this.isAuthenticated = auth;
    });
    this.orderAmountSub = this.cartService.getCartItemAmountObs().subscribe(amount => this.orderAmount = amount);
  }

  handleRegisterBtnClick(): void {
    this.createNewAccount = true;
  }

  handleLoginBtnClick(): void {
    this.createNewAccount = false;
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.orderAmountSub?.unsubscribe();
  }

}
