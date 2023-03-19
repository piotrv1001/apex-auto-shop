import { OrderDTO } from './order.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderDTO: OrderDTO): Promise<Order> {
    return this.orderService.create(orderDTO);
  }

  @Get()
  getAll(): Promise<Order[]> {
    return this.orderService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Get()
  getByUserId(@Query('userId') userId: number): Promise<Order[]> {
    return this.orderService.getByUserId(userId);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.orderService.delete(id);
  }
}
