import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  houseNumber: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  name: string;
}
