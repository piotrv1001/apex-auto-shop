import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { PriceSorterComponent } from './components/price-sorter/price-sorter.component';
import { PriceSliderComponent } from './components/price-slider/price-slider.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { httpInterceptorProviders } from './shared/interceptors/index';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';


import { DeliveryComponent } from './components/delivery/delivery.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductComponent,
    ProductsComponent,
    SearchBarComponent,
    PriceSliderComponent,
    PriceSorterComponent,
    OrderItemComponent,
    CartComponent,
    DeliveryComponent,
    AccountComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule,
    MatSnackBarModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDividerModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  providers: [httpInterceptorProviders, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
