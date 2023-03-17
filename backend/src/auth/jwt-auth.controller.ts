import { UserDTO } from './../user/user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class JwtController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authorize(@Body() user: UserDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.login(user);
    res.setHeader('Authorization', 'Bearer ' + jwt.jwt_token);
    return res.json(jwt);
  }
}
