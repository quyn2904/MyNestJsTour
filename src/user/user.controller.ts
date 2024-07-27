import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { USER_MESSAGE } from './user.message';

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
}
