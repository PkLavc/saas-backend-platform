import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MockRedisService {
  private readonly logger = new Logger(MockRedisService.name);
  private store = new Map<string, { value: any; expiry?: number }>();
  private isAvailable = false;

  constructor() {
    this.logger.warn('Redis not available - using mock Redis service');
    this.isAvailable = false;
  }

  async connect(): Promise<void> {
    this.logger.warn('Mock Redis: Connection attempted but Redis is not available');
    this.isAvailable = false;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Redis: SET operation skipped for ${key} - Redis unavailable`);
      return;
    }
    
    const entry = { value, expiry: ttl ? Date.now() + ttl : undefined };
    this.store.set(key, entry);
    this.logger.debug(`Mock Redis: Set ${key} = ${JSON.stringify(value)}`);
  }

  async get(key: string): Promise<any> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Redis: GET operation failed for ${key} - Redis unavailable`);
      return null;
    }

    const entry = this.store.get(key);
    if (!entry) {
      this.logger.debug(`Mock Redis: Key ${key} not found`);
      return null;
    }

    // Check expiry
    if (entry.expiry && Date.now() > entry.expiry) {
      this.store.delete(key);
      this.logger.debug(`Mock Redis: Key ${key} expired`);
      return null;
    }

    this.logger.debug(`Mock Redis: Got ${key} = ${JSON.stringify(entry.value)}`);
    return entry.value;
  }

  async del(key: string): Promise<void> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Redis: DEL operation skipped for ${key} - Redis unavailable`);
      return;
    }

    this.store.delete(key);
    this.logger.debug(`Mock Redis: Deleted ${key}`);
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isAvailable) {
      this.logger.warn(`Mock Redis: EXISTS operation failed for ${key} - Redis unavailable`);
      return false;
    }

    const entry = this.store.get(key);
    if (!entry) return false;

    // Check expiry
    if (entry.expiry && Date.now() > entry.expiry) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  async flushall(): Promise<void> {
    if (!this.isAvailable) {
      this.logger.warn('Mock Redis: FLUSHALL operation skipped - Redis unavailable');
      return;
    }

    this.store.clear();
    this.logger.debug('Mock Redis: All keys cleared');
  }

  async ping(): Promise<string> {
    if (!this.isAvailable) {
      this.logger.warn('Mock Redis: PING failed - Redis unavailable');
      throw new Error('Redis connection failed');
    }
    return 'PONG';
  }

  getAvailability(): boolean {
    return this.isAvailable;
  }

  // Graceful degradation methods
  async setWithFallback(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await this.set(key, value, ttl);
    } catch (error) {
      this.logger.error(`Mock Redis: Fallback for SET ${key}: ${error.message}`);
      // In a real scenario, this might write to a local file or in-memory cache
    }
  }

  async getWithFallback(key: string): Promise<any> {
    try {
      return await this.get(key);
    } catch (error) {
      this.logger.error(`Mock Redis: Fallback for GET ${key}: ${error.message}`);
      return null;
    }
  }
}