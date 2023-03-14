import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDTO } from './order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderDTO: OrderDTO): Promise<Order> {
    const order = new Order();
    order.date = orderDTO.date;
    order.phoneNumber = orderDTO.phoneNumber;
    order.zipCode = orderDTO.zipCode;
    order.street = orderDTO.street;
    order.houseNumber = orderDTO.houseNumber;
    order.city = orderDTO.city;
    order.name = orderDTO.name;
    return this.orderRepository.save(order);
  }

  async getAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getById(id: number): Promise<Order> {
    return this.orderRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
