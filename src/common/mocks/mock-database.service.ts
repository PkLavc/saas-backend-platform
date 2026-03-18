import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MockDatabaseService {
  private readonly logger = new Logger(MockDatabaseService.name);
  private isAvailable = false;
  private dataStore = new Map<string, any[]>();
  private counters = new Map<string, number>();

  constructor() {
    this.logger.warn('Database not available - using mock database service');
    this.isAvailable = false;
    this.initializeMockData();
  }

  private initializeMockData(): void {
    // Initialize with some mock data for testing
    this.dataStore.set('users', [
      {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: 1
      }
    ]);

    this.dataStore.set('organizations', [
      {
        id: 1,
        name: 'Test Organization',
        domain: 'test.com',
        plan: 'FREE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    this.counters.set('users', 1);
    this.counters.set('organizations', 1);
  }

  async connect(): Promise<void> {
    this.logger.warn('Mock Database: Connection attempted but database is not available');
    this.isAvailable = false;
  }

  // Mock Prisma-like methods
  async findMany<T>(model: string, where?: any): Promise<T[]> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Database: FIND_MANY operation failed for ${model} - Database unavailable`);
      return [];
    }

    const data = this.dataStore.get(model) || [];
    
    if (!where) {
      return [...data];
    }

    // Simple filtering logic
    return data.filter(item => {
      return Object.keys(where).every(key => {
        if (typeof where[key] === 'object' && where[key].contains) {
          return item[key]?.includes(where[key].contains);
        }
        return item[key] === where[key];
      });
    });
  }

  async findUnique<T>(model: string, where: any): Promise<T | null> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Database: FIND_UNIQUE operation failed for ${model} - Database unavailable`);
      return null;
    }

    const data = this.dataStore.get(model) || [];
    const key = Object.keys(where)[0];
    const value = where[key];

    return data.find(item => item[key] === value) || null;
  }

  async create<T>(model: string, data: any): Promise<T> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Database: CREATE operation failed for ${model} - Database unavailable`);
      throw new Error('Database connection failed');
    }

    const id = this.getNextId(model);
    const newItem = {
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentData = this.dataStore.get(model) || [];
    currentData.push(newItem);
    this.dataStore.set(model, currentData);

    this.logger.debug(`Mock Database: Created ${model} with id ${id}`);
    return newItem as T;
  }

  async update<T>(model: string, where: any, data: any): Promise<T> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Database: UPDATE operation failed for ${model} - Database unavailable`);
      throw new Error('Database connection failed');
    }

    const key = Object.keys(where)[0];
    const value = where[key];
    const currentData = this.dataStore.get(model) || [];
    
    const index = currentData.findIndex(item => item[key] === value);
    if (index === -1) {
      throw new Error(`${model} not found`);
    }

    currentData[index] = {
      ...currentData[index],
      ...data,
      updatedAt: new Date()
    };

    this.logger.debug(`Mock Database: Updated ${model} with ${key}=${value}`);
    return currentData[index] as T;
  }

  async delete<T>(model: string, where: any): Promise<T> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Database: DELETE operation failed for ${model} - Database unavailable`);
      throw new Error('Database connection failed');
    }

    const key = Object.keys(where)[0];
    const value = where[key];
    const currentData = this.dataStore.get(model) || [];
    
    const index = currentData.findIndex(item => item[key] === value);
    if (index === -1) {
      throw new Error(`${model} not found`);
    }

    const deletedItem = currentData.splice(index, 1)[0];
    this.logger.debug(`Mock Database: Deleted ${model} with ${key}=${value}`);
    return deletedItem as T;
  }

  async count(model: string, where?: any): Promise<number> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Database: COUNT operation failed for ${model} - Database unavailable`);
      return 0;
    }

    const data = this.dataStore.get(model) || [];
    
    if (!where) {
      return data.length;
    }

    // Simple filtering for count
    return data.filter(item => {
      return Object.keys(where).every(key => {
        if (typeof where[key] === 'object' && where[key].contains) {
          return item[key]?.includes(where[key].contains);
        }
        return item[key] === where[key];
      });
    }).length;
  }

  private getNextId(model: string): number {
    const currentId = this.counters.get(model) || 0;
    const nextId = currentId + 1;
    this.counters.set(model, nextId);
    return nextId;
  }

  getAvailability(): boolean {
    return this.isAvailable;
  }

  // Transaction support (mock)
  async $transaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
    if (!this.isAvailable) {
      this.logger.warn('Mock Database: Transaction failed - Database unavailable');
      throw new Error('Database connection failed');
    }

    // Create a transaction-like context
    const tx = {
      findMany: this.findMany.bind(this),
      findUnique: this.findUnique.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      delete: this.delete.bind(this),
      count: this.count.bind(this)
    };

    return await fn(tx);
  }

  // Graceful degradation methods
  async findManyWithFallback<T>(model: string, where?: any): Promise<T[]> {
    try {
      return await this.findMany(model, where);
    } catch (error) {
      this.logger.error(`Mock Database: Fallback for FIND_MANY ${model}: ${error.message}`);
      return [];
    }
  }

  async createWithFallback<T>(model: string, data: any): Promise<T | null> {
    try {
      return await this.create(model, data);
    } catch (error) {
      this.logger.error(`Mock Database: Fallback for CREATE ${model}: ${error.message}`);
      return null;
    }
  }
}