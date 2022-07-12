import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthorModule } from './author/module';
import { BookModule } from './book/module';
import { CategoryModule } from './category/module';
import { AppConfigService } from './config/appConfigService';

@Module({
  imports: [CacheModule.register(), CategoryModule, BookModule, AuthorModule],
  providers: [ConfigService, AppConfigService],
})
export class AppModule {}
