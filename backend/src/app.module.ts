import { JwtController } from './auth/jwt-auth.controller';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { OrderItem } from 'src/order-item/order-item.entity';
import { Order } from './order/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'shop',
      entities: [User, Order, OrderItem, Product, Category],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, JwtController],
  providers: [AppService],
})
export class AppModule {}
