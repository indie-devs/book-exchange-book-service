import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './config/appConfigService';

@Module({
    imports: [CacheModule.register()],
    providers: [ConfigService, AppConfigService]
})
export class AppModule { }
