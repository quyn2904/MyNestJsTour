import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Public } from './decorators/public.decorator';
import { AUTH_MESSAGE } from './auth.message';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() body: AuthDTO): Promise<{
    message: 'Login Successfully';
    data: {
      access_token: string;
      refresh_token: string;
    };
  }> {
    const tokens = await this.authService.login(body);
    return { message: AUTH_MESSAGE.LOGIN_SUCCESS, data: tokens };
  }
}
