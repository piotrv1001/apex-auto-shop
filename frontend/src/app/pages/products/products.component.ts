import { OrderItem } from './../../model/entities/order-item.model';
import { LocalStorageService } from './../../services/local-storage.service';
import { Sort } from './../../model/types/sort';
import { MinMax } from './../../model/types/min-max';
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/entities/product.model";
import { ProductService } from "src/app/services/product.service";
import { CartService } from 'src/app/services/cart.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  minVal: number = 50;
  maxVal: number = 10000;
  loadingProducts = true;
  sort: Sort = Sort.ASCENDING;

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getProducts();
  }

  handleSearchQueryChange(searchQuery: string): void {
    const queryLowerCase = searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(queryLowerCase) || product.description.toLowerCase().includes(queryLowerCase));
  }

  handleApplyBtnClick(minMax: MinMax): void {
    this.filteredProducts = this.products.filter(product => product.price >= minMax.min && product.price <= minMax.max);
    switch(this.sort) {
      case Sort.ASCENDING:
        this.filteredProducts.sort(this.sortAsc);
        break;
      case Sort.DESCENDING:
        this.filteredProducts.sort(this.sortDesc);
        break;
      case Sort.STAR:
        this.filteredProducts.sort(this.sortBestRated);
    }
  }

  handleProductClick(productId: number): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.cartService.addItemToCart(productId, userId).pipe(
        switchMap((orderItem: OrderItem) => this.cartService.getAmountForOrder(orderItem.orderId))
      ).subscribe(amount => {
        this.cartService.notifyAboutCartItemAmount(amount);
        const message = 'Added item to cart!';
          const action = 'OK';
          const durationInSeconds = 5;
          this.snackBar.open(message, action, {
            duration: durationInSeconds * 1000
          });
      })
    }
  }

  handlePriceSort(sort: Sort): void {
    this.sort = sort;
  }

  handleReset(): void {
    this.filteredProducts = [...this.products];
    this.filteredProducts.sort(this.sortDesc);
  }

  private getProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = [...products];
      this.minVal = Math.min(...this.products.map(product => product.price));
      this.maxVal = Math.max(...this.products.map(product => product.price));
      this.loadingProducts = false;
    });
  }

  private sortAsc(a: Product, b: Product): number {
    return a.price - b.price;
  }

  private sortDesc(a: Product, b: Product): number {
    return b.price - a.price;
  }

  private sortBestRated(a: Product, b: Product): number {
    return b.stars - a.stars;
  }

}
