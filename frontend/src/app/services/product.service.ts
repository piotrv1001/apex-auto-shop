import { BASE_URL } from './../app.constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Product } from '../model/entities/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCT_ROUTE = 'products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/${this.PRODUCT_ROUTE}`);
  }

  initProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/${this.PRODUCT_ROUTE}/init`);
  }
}
