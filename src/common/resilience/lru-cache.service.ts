import { Injectable, Logger } from '@nestjs/common';

interface CacheEntry<T> {
  value: T;
  expiry: number;
  accessCount: number;
  lastAccess: number;
}

@Injectable()
export class LRUCacheService {
  private readonly logger = new Logger(LRUCacheService.name);
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor() {
    this.maxSize = 1000;          // Fixed size limit
    this.defaultTTL = 300000;      // 5 minutes default TTL
  }

  /**
   * Set a value in the cache with optional TTL
   */
  set<T>(key: string, value: T, ttl: number = this.defaultTTL): void {
    // Force cleanup before operation to prevent memory leaks
    this.cleanup();
    
    const now = Date.now();
    const expiry = now + ttl;

    // If key exists, update it
    if (this.cache.has(key)) {
      const entry = this.cache.get(key)!;
      entry.value = value;
      entry.expiry = expiry;
      entry.accessCount++;
      entry.lastAccess = now;
      return;
    }

    // If cache is full, remove LRU entry (strict size limit enforcement)
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    // Add new entry
    this.cache.set(key, {
      value,
      expiry,
      accessCount: 1,
      lastAccess: now
    });

    this.logger.debug(`Cache set: ${key}, size: ${this.cache.size}/${this.maxSize}`);
  }

  /**
   * Get a value from the cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.logger.debug(`Cache miss: ${key}`);
      return null;
    }

    const now = Date.now();

    // Check if expired
    if (now > entry.expiry) {
      this.cache.delete(key);
      this.logger.debug(`Cache expired: ${key}`);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccess = now;

    this.logger.debug(`Cache hit: ${key}, access count: ${entry.accessCount}`);
    return entry.value;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now > entry.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.logger.debug(`Cache deleted: ${key}`);
    }
    return deleted;
  }

  /**
   * Clear all entries from cache
   */
  clear(): void {
    this.cache.clear();
    this.logger.debug('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    usage: number;
    oldestEntry: number | null;
    newestEntry: number | null;
  } {
    // Force cleanup before getting stats to prevent memory leaks
    this.cleanup();
    
    const now = Date.now();
    let oldest = null;
    let newest = null;

    for (const [key, entry] of this.cache.entries()) {
      if (now <= entry.expiry) { // Only consider non-expired entries
        if (oldest === null || entry.lastAccess < oldest) {
          oldest = entry.lastAccess;
        }
        if (newest === null || entry.lastAccess > newest) {
          newest = entry.lastAccess;
        }
      }
    }

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      usage: (this.cache.size / this.maxSize) * 100,
      oldestEntry: oldest,
      newestEntry: newest
    };
  }

  /**
   * Evict Least Recently Used entry
   */
  evictLRU(): void {
    let lruKey: string | null = null;
    let oldestAccess = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccess < oldestAccess) {
        oldestAccess = entry.lastAccess;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
      this.logger.debug(`Cache evicted LRU: ${lruKey}`);
    }
  }

  /**
   * Cleanup expired entries
   */
  cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      this.logger.debug(`Cache cleanup: removed ${cleanedCount} expired entries`);
    }

    // If still over capacity, evict more
    while (this.cache.size > this.maxSize) {
      this.evictLRU();
    }
  }

  /**
   * Get memory usage estimate
   */
  getMemoryUsage(): {
    approximateSizeMB: number;
    entryCount: number;
    averageEntrySizeBytes: number;
  } {
    // Rough estimation of memory usage
    const entryCount = this.cache.size;
    let totalSize = 0;

    for (const [key, entry] of this.cache.entries()) {
      // Estimate size: key + value serialization + metadata
      const keySize = Buffer.byteLength(key, 'utf8');
      const valueSize = JSON.stringify(entry.value).length;
      const metadataSize = 32; // Approximate metadata size
      
      totalSize += keySize + valueSize + metadataSize;
    }

    return {
      approximateSizeMB: totalSize / (1024 * 1024),
      entryCount,
      averageEntrySizeBytes: entryCount > 0 ? totalSize / entryCount : 0
    };
  }

  /**
   * On module destroy - no cleanup needed (simplified version)
   */
  onModuleDestroy(): void {
    // No cleanup interval to clear in simplified version
    this.logger.debug('LRUCacheService destroyed');
  }
}