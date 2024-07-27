import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // this module is global and can be used in any module
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // other modules can use PrismaService
})
export class PrismaModule {}
