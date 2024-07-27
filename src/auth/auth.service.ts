import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { AUTH_MESSAGE } from './auth.message';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(authDTO: AuthDTO): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.userService.userServicefindUserBasedOnEmail(
      authDTO.email,
    );

    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGE.ERROR_EMAIL_OR_PASSWORD);
    }

    const isPasswordValid = await argon.verify(user.password, authDTO.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_MESSAGE.ERROR_EMAIL_OR_PASSWORD);
    }

    const payload = { sub: user.id, role: user.role };
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '30d',
      privateKey: process.env.JWT_SECRET,
      algorithm: 'HS256',
    });

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token,
    };
  }
}
