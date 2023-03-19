import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderItem {
  constructor(
    public productId: number,
    public orderId: number,
    public amount: number,
    public product: Product,
    public order: Order
  ) {}
}
