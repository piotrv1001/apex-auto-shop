import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';

@Controller('order_items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(
    @Query('userId') userId: number,
    @Query('productId') productId: number,
  ): Promise<OrderItem> {
    return this.orderItemService.create(userId, productId);
  }

  @Get()
  getAll(): Promise<OrderItem[]> {
    return this.orderItemService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.orderItemService.delete(id);
  }
}
