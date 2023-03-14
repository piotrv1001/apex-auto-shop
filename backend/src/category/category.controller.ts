import { CategoryDTO } from './category.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() categoryDTO: CategoryDTO): Promise<Category> {
    return this.categoryService.create(categoryDTO);
  }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.categoryService.delete(id);
  }
}
