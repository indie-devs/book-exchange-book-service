import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AuthorsModule } from './author/module';
import { BooksModule } from './book/module';
import { CategoriesModule } from './category/module';
import { AppConfigService } from './config/appConfigService';
import { ExternalModule } from './external/module';
import { AllExceptionsFilter } from './infras/exceptionsFilter';

@Module({
  imports: [
    CacheModule.register(),
    CategoriesModule,
    BooksModule,
    AuthorsModule,
    ExternalModule
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }, ConfigService, AppConfigService],

})
export class AppModule { }
