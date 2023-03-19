import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(userId: number, productId: number): Promise<OrderItem> {
    throw new Error('TODO');
  }

  async getAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  async getById(productId: number, orderId: number): Promise<OrderItem> {
    return this.orderItemRepository.findOneBy({
      productId: productId,
      orderId: orderId,
    });
  }

  async delete(id: number): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}
