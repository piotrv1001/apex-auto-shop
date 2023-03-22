import { Controller, Delete, Get, Patch, Request, Query } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';

@Controller('order_items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  getAll(): Promise<OrderItem[]> {
    return this.orderItemService.getAll();
  }

  @Patch()
  partialUpdate(@Request() req): Promise<OrderItem> {
    return this.orderItemService.partialUpdate(req.body);
  }

  @Delete()
  delete(
    @Query('productId') productId: number,
    @Query('orderId') orderId: number,
  ): Promise<void> {
    return this.orderItemService.delete(productId, orderId);
  }
}
