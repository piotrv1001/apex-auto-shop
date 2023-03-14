import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(categoryDTO: CategoryDTO): Promise<Category> {
    const category = new Category();
    category.name = categoryDTO.name;
    return this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
