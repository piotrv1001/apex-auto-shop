import { OrderItem } from './../../model/entities/order-item.model';
import { LocalStorageService } from './../../services/local-storage.service';
import { Sort } from './../../model/types/sort';
import { MinMax } from './../../model/types/min-max';
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/entities/product.model";
import { ProductService } from "src/app/services/product.service";
import { CartService } from 'src/app/services/cart.service';
import { switchMap } from 'rxjs';

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

  constructor(
    private productService: ProductService,
    private localStorageService: LocalStorageService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  handleSearchQueryChange(searchQuery: string): void {
    const queryLowerCase = searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(queryLowerCase) || product.description.toLowerCase().includes(queryLowerCase));
  }

  handleApplyBtnClick(minMax: MinMax): void {
    this.filteredProducts = this.products.filter(product => product.price >= minMax.min && product.price <= minMax.max);
  }

  handleProductClick(productId: number): void {
    const userId = this.localStorageService.getUserId();
    if(userId) {
      this.cartService.addItemToCart(productId, userId).pipe(
        switchMap((orderItem: OrderItem) => this.cartService.getAmountForOrder(orderItem.orderId))
      ).subscribe(amount => {
        console.log('amount', amount);
        this.cartService.notifyAboutCartItemAmount(amount);
      })
      // this.cartService.addItemToCart(productId, userId).subscribe({
      //   next: (orderItem: OrderItem) => {
      //     console.log('orderItem', orderItem);
      //   }
      // })
    }
  }

  handlePriceSort(sort: Sort): void {
    const sortAsc = (a: Product, b: Product) => a.price - b.price;
    const sortDesc = (a: Product, b: Product) => b.price - a.price;
    if(sort === Sort.ASCENDING) {
      this.filteredProducts.sort(sortAsc);
      this.products.sort(sortAsc);
    } else {
      this.filteredProducts.sort(sortDesc);
      this.products.sort(sortDesc);
    }
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

}
