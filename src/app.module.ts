import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './config/appConfigService';

@Module({
    providers: [ConfigService, AppConfigService]
})
export class AppModule { }
