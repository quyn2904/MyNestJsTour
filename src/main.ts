import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// như Express
/*
  Generate a module: nest g module "module name"
  - controller: receive request from client and call services to do implementations
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add middleware here
  app.useGlobalPipes(new ValidationPipe());
  // req gửi đến controller phải đi qua ValidationPipe để validate dữ liệu trước
  await app.listen(3000);
}
bootstrap();
