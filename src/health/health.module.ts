import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ResilienceModule } from '../common/resilience/resilience.module';

@Module({
  imports: [
    TerminusModule,
    ResilienceModule,
  ],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class HealthModule {}