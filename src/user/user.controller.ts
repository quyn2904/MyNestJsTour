import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RegisterDTO } from './dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { USER_MESSAGE } from './user.message';
import { Roles } from 'src/auth/decorators/role.decorator';
import { USER_ROLE } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const user = await this.userService.register(body);
    return {
      message: USER_MESSAGE.REGISTER_SUCCESS,
      data: user,
    };
  }

  @Get('me')
  async getMe(@Request() req) {
    const user_id = req.user.sub;
    const user = await this.userService.getMe(user_id);
    return {
      message: USER_MESSAGE.GET_ME_SUCCESS,
      data: user,
    };
  }
}
