import { Order } from './../order/order.entity';
import { Product } from './../product/product.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, Relation } from 'typeorm';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryColumn()
  productId?: number;

  @PrimaryColumn()
  orderId?: number;

  @Column({ nullable: true, default: 1 })
  amount?: number;

  @ManyToOne(() => Product, (product) => product.orderItems, { nullable: true })
  product?: Relation<Product>;

  @ManyToOne(() => Order, (order) => order.orderItems, { nullable: true })
  order: Relation<Order>;
}
