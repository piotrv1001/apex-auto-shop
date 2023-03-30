import { ProductDTO } from './product.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('init')
  initProducts() {
    return this.productService.initProducts();
  }

  @Post()
  create(@Body() productDTO: ProductDTO): Promise<Product> {
    return this.productService.create(productDTO);
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Product> {
    return this.productService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
