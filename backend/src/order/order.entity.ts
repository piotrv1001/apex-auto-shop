import { User } from './../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { OrderItem } from 'src/order-item/order-item.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  date?: Date;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  houseNumber?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, default: true })
  active?: boolean;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  user?: Relation<User>;

  @Column({ nullable: true })
  userId?: number;

  @Column({ nullable: true })
  orderNumber?: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  orderItems?: Relation<OrderItem[]>;
}
