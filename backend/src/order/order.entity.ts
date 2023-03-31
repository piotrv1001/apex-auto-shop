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

  @Column({ nullable: true, default: '' })
  phoneNumber?: string;

  @Column({ nullable: true, default: '' })
  zipCode?: string;

  @Column({ nullable: true, default: '' })
  street?: string;

  @Column({ nullable: true, default: '' })
  houseNumber?: string;

  @Column({ nullable: true, default: '' })
  city?: string;

  @Column({ nullable: true, default: '' })
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
