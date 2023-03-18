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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  handleProductClick(id: number): void {
    const product = this.products.find(product => product.id === id);
    console.log('product', product);
  }

  private getProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

}
