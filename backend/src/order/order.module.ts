import { CartService } from './../cart/cart.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartController } from 'src/cart/cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, CartService],
  controllers: [OrderController, CartController],
})
export class OrderModule {}
