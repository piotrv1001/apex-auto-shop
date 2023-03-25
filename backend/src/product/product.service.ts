import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(productDTO: ProductDTO): Promise<Product> {
    const product = new Product();
    product.name = productDTO.name;
    product.description = productDTO.description;
    product.price = productDTO.price;
    product.stars = productDTO.stars;
    return this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
