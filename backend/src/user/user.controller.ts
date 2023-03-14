import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDTO: UserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
