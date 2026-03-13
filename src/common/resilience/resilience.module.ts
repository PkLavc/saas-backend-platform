import { Module } from '@nestjs/common';
import { ResilienceService } from './resilience.service';
import { LRUCacheService } from './lru-cache.service';

@Module({
  providers: [ResilienceService, LRUCacheService],
  exports: [ResilienceService, LRUCacheService],
})
export class ResilienceModule {}
