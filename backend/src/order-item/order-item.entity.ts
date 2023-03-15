import { Order } from './../order/order.entity';
import { Product } from './../product/product.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  orderId: number;

  @Column({ default: 1 })
  amount: number;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
