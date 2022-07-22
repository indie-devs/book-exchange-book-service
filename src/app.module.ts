import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthorsModule } from './author/module';
import { BooksModule } from './book/module';
import { CategoriesModule } from './category/module';
import { AppConfigService } from './config/appConfigService';
import { ExternalModule } from './external/module';

@Module({
  imports: [
    CacheModule.register(),
    CategoriesModule,
    BooksModule,
    AuthorsModule,
    ExternalModule
  ],
  providers: [ConfigService, AppConfigService],
})
export class AppModule {}
