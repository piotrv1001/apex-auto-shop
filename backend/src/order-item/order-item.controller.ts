import { Controller, Delete, Get, Param, Patch, Request } from '@nestjs/common';
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

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.orderItemService.delete(id);
  }
}
