import { OrderItem } from './../order-item/order-item.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async addItemToCart(userId: number, productId: number): Promise<OrderItem> {
    const currentOrder = await this.orderRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    const orderItem = new OrderItem();
    orderItem.productId = productId;
    if (currentOrder === null) {
      const newOrder = new Order();
      newOrder.date = new Date();
      newOrder.userId = userId;
      const insertedOrder = await this.orderRepository.save(newOrder);
      orderItem.orderId = insertedOrder.id;
    } else {
      orderItem.orderId = currentOrder.id;
    }
    const existingOrderItem = await this.orderItemRepository.findOne({
      where: {
        orderId: orderItem.orderId,
        productId: orderItem.productId,
      },
    });
    if (existingOrderItem === null) {
      return await this.orderItemRepository.save(orderItem);
    }
    return existingOrderItem;
  }

  async getCountForOrder(orderId: number): Promise<number> {
    return this.orderItemRepository.count({
      where: {
        orderId: orderId,
      },
    });
  }
}
