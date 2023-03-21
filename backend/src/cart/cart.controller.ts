import { CartService } from './cart.service';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { OrderItem } from 'src/order-item/order-item.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(
    @Query('userId') userId: number,
    @Query('productId') productId: number,
  ): Promise<OrderItem> {
    return this.cartService.addItemToCart(userId, productId);
  }

  @Get('count')
  getAmountForOrder(@Query('orderId') orderId: number): Promise<number> {
    return this.cartService.getCountForOrder(orderId);
  }
}
