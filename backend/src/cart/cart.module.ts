import { OrderController } from './../order/order.controller';
import { OrderService } from './../order/order.service';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/order.entity';
import { OrderItemController } from 'src/order-item/order-item.controller';
import { OrderItem } from 'src/order-item/order-item.entity';
import { OrderItemService } from 'src/order-item/order-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderItem]),
  ],
  providers: [CartService, OrderService, OrderItemService],
  controllers: [CartController, OrderController, OrderItemController],
})
export class CartModule {}
