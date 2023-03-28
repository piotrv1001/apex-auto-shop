import { Order } from './../order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true, default: '' })
  email?: string;

  @Column({ nullable: true, default: '' })
  name?: string;

  @Column({ nullable: true, default: '' })
  zipCode?: string;

  @Column({ nullable: true, default: '' })
  city?: string;

  @Column({ nullable: true, default: '' })
  street?: string;

  @Column({ nullable: true, default: '' })
  houseNumber?: string;

  @Column({ nullable: true, default: '' })
  phoneNumber?: string;

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders?: Order[];
}
