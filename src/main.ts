import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/appConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService  = app.get<AppConfigService>(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
