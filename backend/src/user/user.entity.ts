import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  houseNumber: string;
}
