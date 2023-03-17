import { UserDTO } from './../user/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDTO: UserDTO) {
    const foundUser = await this.usersService.getByEmail(userDTO.email);
    if (!foundUser || foundUser.password !== userDTO.password) {
      throw new HttpException(
        'Invalid login name or password!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { email: foundUser.email, id: foundUser.id };
    return {
      jwt_token: this.jwtService.sign(payload),
    };
  }
}
