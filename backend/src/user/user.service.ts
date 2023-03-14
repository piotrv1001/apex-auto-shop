import { UserDTO } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDTO: UserDTO): Promise<User> {
    const user = new User();
    user.email = userDTO.email;
    user.password = userDTO.password;
    return this.userRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
