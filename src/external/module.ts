import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/module';

@Module({
  imports: [ReviewsModule],
})
export class ExternalModule {}
