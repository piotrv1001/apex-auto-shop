import { Sort } from './../../model/types/sort';
import { MinMax } from './../../model/types/min-max';
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/entities/product.model";
import { ProductService } from "src/app/services/product.service";

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

  constructor(private productService: ProductService) {}

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

  handleProductClick(id: number): void {
    const product = this.products.find(product => product.id === id);
    console.log('product', product);
  }

  handlePriceSort(sort: Sort): void {
    if(sort === Sort.ASCENDING) {
      this.filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
    } else {
      this.filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
    }
  }

  private getProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = [...products];
      this.minVal = Math.min(...this.products.map(product => product.price));
      this.maxVal = Math.max(...this.products.map(product => product.price));
      this.loadingProducts = false;
      console.log('product min val', this.minVal);
      console.log('product max val', this.maxVal);
    });
  }

}
