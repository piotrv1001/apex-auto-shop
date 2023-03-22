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

  async getAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  async getById(productId: number, orderId: number): Promise<OrderItem> {
    return this.orderItemRepository.findOneBy({
      productId: productId,
      orderId: orderId,
    });
  }

  async partialUpdate(orderItem: OrderItem): Promise<OrderItem> {
    return this.orderItemRepository.save(orderItem);
  }

  async delete(productId: number, orderId: number): Promise<void> {
    await this.orderItemRepository.delete({
      productId: productId,
      orderId: orderId,
    });
  }
}
