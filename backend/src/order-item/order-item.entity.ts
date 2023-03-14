import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  orderId: number;

  @Column({ default: 1 })
  amount: number;
}
