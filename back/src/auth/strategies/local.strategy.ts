import { AuthService } from './../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User from 'src/app/models/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    console.log('AQUI');
  }

  async validate(username: string, password: string): Promise<any> {
    const user: User = await this.authService.auth(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
