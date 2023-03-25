import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Product } from "src/app/model/entities/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss', '../../pages/login/login.component.scss']
})
export class ProductComponent implements OnInit{

  @Input() product?: Product;
  @Output() productClick: EventEmitter<number> = new EventEmitter<number>();
  starArray: number[] = [];

  ngOnInit(): void {
    this.starArray = Array.from(Array(this.product?.stars).keys());
  }

  productClicked(): void {
    if(this.product && this.product.id) {
      this.productClick.emit(this.product?.id);
    } else {
      throw new Error('Unknown product');
    }
  }

}
