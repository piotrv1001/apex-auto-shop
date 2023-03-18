import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/model/entities/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product?: Product;
  @Output() productClick: EventEmitter<number> = new EventEmitter<number>();

  productClicked(): void {
    if(this.product && this.product.id) {
      this.productClick.emit(this.product?.id);
    } else {
      throw new Error('Unknown product');
    }
  }

}
