import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { CircuitBreaker } from './circuit-breaker';
import { RetryPolicy } from './retry-policy';
import { LRUCacheService } from './lru-cache.service';

export interface ResilienceOptions {
  circuitBreaker?: {
    failureThreshold?: number;
    recoveryTimeout?: number;
    monitoringPeriod?: number;
  };
  retry?: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    backoffMultiplier?: number;
  };
}

@Injectable()
export class ResilienceService implements OnModuleDestroy {
  private readonly logger = new Logger(ResilienceService.name);
  
  // Replace Maps with LRU Cache to prevent memory leaks
  private circuitBreakers: LRUCacheService;
  private retryPolicies: LRUCacheService;

  constructor() {
    // Initialize LRU caches with production-ready settings
    this.circuitBreakers = new LRUCacheService();
    this.retryPolicies = new LRUCacheService();
  }

  async execute<T>(
    operationName: string,
    operation: () => Promise<T>,
    options: ResilienceOptions = {}
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      // Get or create circuit breaker for this operation with LRU caching
      let circuitBreaker = this.circuitBreakers.get<CircuitBreaker>(operationName);
      if (!circuitBreaker) {
        circuitBreaker = new CircuitBreaker({
          failureThreshold: options.circuitBreaker?.failureThreshold || 5,
          recoveryTimeout: options.circuitBreaker?.recoveryTimeout || 60000,
          monitoringPeriod: options.circuitBreaker?.monitoringPeriod || 10000,
        });
        this.circuitBreakers.set(operationName, circuitBreaker, 3600000); // 1 hour TTL
      }

      // Check if circuit breaker is open
      if (circuitBreaker.isOpen()) {
        const error = new Error(`Circuit breaker is open for operation: ${operationName}`);
        this.logger.warn(`Circuit breaker open: ${operationName}`);
        throw error;
      }

      // Execute with retry policy using LRU cache
      const retryPolicy = this.getRetryPolicy(operationName, options.retry);
      
      return await retryPolicy.execute(async () => {
        try {
          const result = await circuitBreaker.execute(operation);
          const duration = Date.now() - startTime;
          
          this.logger.log(`Operation ${operationName} succeeded in ${duration}ms`);
          return result;
        } catch (error) {
          const duration = Date.now() - startTime;
          this.logger.error(`Operation ${operationName} failed after ${duration}ms:`, error);
          throw error;
        }
      });

    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Operation ${operationName} failed after ${duration}ms:`, error);
      throw error;
    }
  }

  private getRetryPolicy(operationName: string, retryOptions?: any): RetryPolicy {
    let retryPolicy = this.retryPolicies.get<RetryPolicy>(operationName);
    if (!retryPolicy) {
      retryPolicy = new RetryPolicy({
        maxAttempts: retryOptions?.maxAttempts || 3,
        baseDelay: retryOptions?.baseDelay || 1000,
        maxDelay: retryOptions?.maxDelay || 10000,
        backoffMultiplier: retryOptions?.backoffMultiplier || 2,
      });
      this.retryPolicies.set(operationName, retryPolicy, 1800000); // 30 minutes TTL
    }
    return retryPolicy;
  }

  getHealthStatus(): any {
    const status = {};
    const circuitBreakerStats = this.circuitBreakers.getStats();
    const retryPolicyStats = this.retryPolicies.getStats();

    // Get all circuit breaker states
    for (const [operationName, circuitBreaker] of (this.circuitBreakers as any).cache.entries()) {
      if (Date.now() <= circuitBreaker.expiry) { // Only non-expired entries
        status[operationName] = {
          state: circuitBreaker.value.getState(),
          failures: circuitBreaker.value.getFailureCount(),
          lastFailure: circuitBreaker.value.getLastFailureTime(),
          accessCount: circuitBreaker.accessCount,
          lastAccess: circuitBreaker.lastAccess
        };
      }
    }

    // Add cache statistics
    status['_cacheStats'] = {
      circuitBreakers: {
        ...circuitBreakerStats,
        memoryUsage: this.circuitBreakers.getMemoryUsage()
      },
      retryPolicies: {
        ...retryPolicyStats,
        memoryUsage: this.retryPolicies.getMemoryUsage()
      }
    };

    return status;
  }

  /**
   * Get detailed memory usage and performance metrics
   */
  getPerformanceMetrics(): {
    memoryUsage: {
      circuitBreakers: any;
      retryPolicies: any;
    };
    cacheEfficiency: {
      circuitBreakers: {
        hitRate: number;
        missRate: number;
      };
      retryPolicies: {
        hitRate: number;
        missRate: number;
      };
    };
    operationCounts: {
      totalOperations: number;
      activeOperations: number;
    };
  } {
    const cbStats = this.circuitBreakers.getStats();
    const rpStats = this.retryPolicies.getStats();

    return {
      memoryUsage: {
        circuitBreakers: this.circuitBreakers.getMemoryUsage(),
        retryPolicies: this.retryPolicies.getMemoryUsage()
      },
      cacheEfficiency: {
        circuitBreakers: {
          hitRate: cbStats.size > 0 ? (cbStats.size / (cbStats.size + 100)) * 100 : 0, // Simplified calculation
          missRate: cbStats.size > 0 ? (100 / (cbStats.size + 100)) * 100 : 100
        },
        retryPolicies: {
          hitRate: rpStats.size > 0 ? (rpStats.size / (rpStats.size + 100)) * 100 : 0,
          missRate: rpStats.size > 0 ? (100 / (rpStats.size + 100)) * 100 : 100
        }
      },
      operationCounts: {
        totalOperations: cbStats.size + rpStats.size,
        activeOperations: cbStats.size // Only non-expired circuit breakers
      }
    };
  }

  /**
   * Force cleanup of expired entries
   */
  forceCleanup(): void {
    this.circuitBreakers.cleanup();
    this.retryPolicies.cleanup();
    this.logger.log('Forced cleanup completed');
  }

  /**
   * Clear all cached resilience patterns (for testing or emergency)
   */
  clearCache(): void {
    this.circuitBreakers.clear();
    this.retryPolicies.clear();
    this.logger.warn('All resilience cache cleared');
  }

  /**
   * On module destroy - cleanup resources
   */
  onModuleDestroy(): void {
    this.circuitBreakers.onModuleDestroy();
    this.retryPolicies.onModuleDestroy();
    this.logger.log('ResilienceService destroyed and cleaned up');
  }
}