import { OrderItemDTO } from './order-item.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './order-item.entity';

@Controller('order_items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() orderItemDTO: OrderItemDTO): Promise<OrderItem> {
    return this.orderItemService.create(orderItemDTO);
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
