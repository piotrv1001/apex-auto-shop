import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Order, OrderItem, Product, Category],
        synchronize: true,
      }),
    }),
    AuthModule,
    ProductModule,
    CategoryModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
