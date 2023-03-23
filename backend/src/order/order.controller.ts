import { OrderDTO } from './order.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
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
  getByUserId(
    @Query('userId') userId: number,
    @Query('active') active: string,
  ): Promise<Order[]> {
    return this.orderService.getByUserId(userId, active);
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getById(id);
  }

  @Patch()
  partialUpdate(@Request() req): Promise<Order> {
    return this.orderService.partialUpdate(req.body);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.orderService.delete(id);
  }
}
