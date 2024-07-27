import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegisterDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_MESSAGE } from './user.message';
import { User } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async userServicefindUserBasedOnEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async register(data: RegisterDTO): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new UnprocessableEntityException(
        USER_MESSAGE.ERROR_EMAIL_ALREADY_EXISTS,
      );
    }

    const hashedPassword = await argon.hash(data.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      delete user.password;

      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getMe(user_id: number): Promise<Omit<User, 'password' | 'role'>> {
    return this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        avatar_url: true,
        phone_number: true,
      },
    });
  }
}
