import { User } from './../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderItem } from 'src/order-item/order-item.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  phoneNumber: string;

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

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  user?: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
