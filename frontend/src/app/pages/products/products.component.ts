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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  handleSearchQueryChange(searchQuery: string): void {
    const queryLowerCase = searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(queryLowerCase) || product.description.toLowerCase().includes(queryLowerCase));
  }

  handleProductClick(id: number): void {
    const product = this.products.find(product => product.id === id);
    console.log('product', product);
  }

  private getProducts(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = [...products];
    });
  }

}
