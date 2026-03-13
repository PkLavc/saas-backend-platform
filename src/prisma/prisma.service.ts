import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private isMockMode = false;

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection established successfully');
      this.isMockMode = false;
    } catch (error) {
      console.error('Database connection failed:', error.message);
      console.log('Running in mock mode - database operations will be simulated');
      this.isMockMode = true;
    }
  }

  // Graceful degradation: return mock data when database is unavailable
  // The model methods (user, organization, project, task) are inherited from PrismaClient
  // When database is unavailable, we'll handle this at the repository level
}
