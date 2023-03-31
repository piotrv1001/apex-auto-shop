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
    product.imgUrl = productDTO.imgUrl;
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

  async initProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();
    if (products.length > 0) {
      return products;
    }
    const lambo = new Product();
    lambo.name = 'Lamborghini Huracan';
    lambo.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis tristique eros, bibendum venenatis odio. Praesent sagittis et quam sit amet tempor. Ut dignissim placerat.';
    lambo.imgUrl = 'lambo.png';
    lambo.stars = 5;
    lambo.price = 400000;
    const mclaren = new Product();
    mclaren.name = 'Mclaren 720s';
    mclaren.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis tristique eros, bibendum venenatis odio. Praesent sagittis et quam sit amet tempor. Ut dignissim placerat.';
    mclaren.imgUrl = 'mclaren.png';
    mclaren.stars = 4;
    mclaren.price = 350000;
    const bmw = new Product();
    bmw.name = 'BMW 8 Series Gran Coupe';
    bmw.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis tristique eros, bibendum venenatis odio. Praesent sagittis et quam sit amet tempor. Ut dignissim placerat.';
    bmw.imgUrl = 'bmw.png';
    bmw.stars = 3;
    bmw.price = 150000;
    const porsche = new Product();
    porsche.name = 'Porsche 911 GT3 RS';
    porsche.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis tristique eros, bibendum venenatis odio. Praesent sagittis et quam sit amet tempor. Ut dignissim placerat.';
    porsche.imgUrl = 'porsche.png';
    porsche.stars = 4;
    porsche.price = 320000;
    const mustang = new Product();
    mustang.name = 'Mustang GT500';
    mustang.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis tristique eros, bibendum venenatis odio. Praesent sagittis et quam sit amet tempor. Ut dignissim placerat.';
    mustang.imgUrl = 'mustang.png';
    mustang.stars = 4;
    mustang.price = 100000;
    const ferrari = new Product();
    ferrari.name = 'Ferrari SF90 Stradale';
    ferrari.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis tristique eros, bibendum venenatis odio. Praesent sagittis et quam sit amet tempor. Ut dignissim placerat.';
    ferrari.imgUrl = 'Ferrari.png';
    ferrari.stars = 5;
    ferrari.price = 300000;
    return await Promise.all([
      this.productRepository.save(lambo),
      this.productRepository.save(mclaren),
      this.productRepository.save(bmw),
      this.productRepository.save(porsche),
      this.productRepository.save(mustang),
      this.productRepository.save(ferrari),
    ]);
  }
}
