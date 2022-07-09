import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/module';
import { AppConfigService } from './config/appConfigService';

@Module({
    imports: [CacheModule.register(), CategoryModule],
    providers: [ConfigService, AppConfigService]
})
export class AppModule { }
