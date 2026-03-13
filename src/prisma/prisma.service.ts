import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MockDatabaseService } from '../common/mocks/mock-database.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private isMockMode = false;
  private mockDatabase: MockDatabaseService;

  constructor(mockDatabase: MockDatabaseService) {
    super();
    this.mockDatabase = mockDatabase;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection established successfully');
      this.isMockMode = false;
    } catch (error) {
      console.error('Database connection failed:', error.message);
      console.log('Running in mock mode - database operations will be simulated');
      this.isMockMode = true;
      await this.mockDatabase.connect();
    }
  }

  getIsMockMode(): boolean {
    return this.isMockMode;
  }
}
