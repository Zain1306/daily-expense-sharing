import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 app.enableCors(); // Enable CORS for all routes
 await app.listen(3000);

  Logger.debug(`Server Started http:localhost:3000`);
  Logger.debug(`Database:${process.env.DATABASE_NAME}`);
  Logger.debug(`Database user:${process.env.DATABASE_USER}`);
  Logger.debug(`api versions:/api/v1`);
}
bootstrap();
