import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MockDatabaseService } from '../common/mocks/mock-database.service';

@Global()
@Module({
  providers: [PrismaService, MockDatabaseService],
  exports: [PrismaService, MockDatabaseService],
})
export class PrismaModule {}
