"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ResilienceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResilienceService = void 0;
const common_1 = require("@nestjs/common");
const circuit_breaker_1 = require("./circuit-breaker");
const retry_policy_1 = require("./retry-policy");
const lru_cache_service_1 = require("./lru-cache.service");
let ResilienceService = ResilienceService_1 = class ResilienceService {
    constructor() {
        this.logger = new common_1.Logger(ResilienceService_1.name);
        this.circuitBreakers = new lru_cache_service_1.LRUCacheService();
        this.retryPolicies = new lru_cache_service_1.LRUCacheService();
    }
    async execute(operationName, operation, options = {}) {
        const startTime = Date.now();
        try {
            let circuitBreaker = this.circuitBreakers.get(operationName);
            if (!circuitBreaker) {
                circuitBreaker = new circuit_breaker_1.CircuitBreaker({
                    failureThreshold: options.circuitBreaker?.failureThreshold || 5,
                    recoveryTimeout: options.circuitBreaker?.recoveryTimeout || 60000,
                    monitoringPeriod: options.circuitBreaker?.monitoringPeriod || 10000,
                });
                this.circuitBreakers.set(operationName, circuitBreaker, 3600000);
            }
            if (circuitBreaker.isOpen()) {
                const error = new Error(`Circuit breaker is open for operation: ${operationName}`);
                this.logger.warn(`Circuit breaker open: ${operationName}`);
                throw error;
            }
            const retryPolicy = this.getRetryPolicy(operationName, options.retry);
            return await retryPolicy.execute(async () => {
                try {
                    const result = await circuitBreaker.execute(operation);
                    const duration = Date.now() - startTime;
                    this.logger.log(`Operation ${operationName} succeeded in ${duration}ms`);
                    return result;
                }
                catch (error) {
                    const duration = Date.now() - startTime;
                    this.logger.error(`Operation ${operationName} failed after ${duration}ms:`, error);
                    throw error;
                }
            });
        }
        catch (error) {
            const duration = Date.now() - startTime;
            this.logger.error(`Operation ${operationName} failed after ${duration}ms:`, error);
            throw error;
        }
    }
    getRetryPolicy(operationName, retryOptions) {
        let retryPolicy = this.retryPolicies.get(operationName);
        if (!retryPolicy) {
            retryPolicy = new retry_policy_1.RetryPolicy({
                maxAttempts: retryOptions?.maxAttempts || 3,
                baseDelay: retryOptions?.baseDelay || 1000,
                maxDelay: retryOptions?.maxDelay || 10000,
                backoffMultiplier: retryOptions?.backoffMultiplier || 2,
            });
            this.retryPolicies.set(operationName, retryPolicy, 1800000);
        }
        return retryPolicy;
    }
    getHealthStatus() {
        const status = {};
        const circuitBreakerStats = this.circuitBreakers.getStats();
        const retryPolicyStats = this.retryPolicies.getStats();
        for (const [operationName, circuitBreaker] of this.circuitBreakers.cache.entries()) {
            if (Date.now() <= circuitBreaker.expiry) {
                status[operationName] = {
                    state: circuitBreaker.value.getState(),
                    failures: circuitBreaker.value.getFailureCount(),
                    lastFailure: circuitBreaker.value.getLastFailureTime(),
                    accessCount: circuitBreaker.accessCount,
                    lastAccess: circuitBreaker.lastAccess
                };
            }
        }
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
    getPerformanceMetrics() {
        const cbStats = this.circuitBreakers.getStats();
        const rpStats = this.retryPolicies.getStats();
        return {
            memoryUsage: {
                circuitBreakers: this.circuitBreakers.getMemoryUsage(),
                retryPolicies: this.retryPolicies.getMemoryUsage()
            },
            cacheEfficiency: {
                circuitBreakers: {
                    hitRate: cbStats.size > 0 ? (cbStats.size / (cbStats.size + 100)) * 100 : 0,
                    missRate: cbStats.size > 0 ? (100 / (cbStats.size + 100)) * 100 : 100
                },
                retryPolicies: {
                    hitRate: rpStats.size > 0 ? (rpStats.size / (rpStats.size + 100)) * 100 : 0,
                    missRate: rpStats.size > 0 ? (100 / (rpStats.size + 100)) * 100 : 100
                }
            },
            operationCounts: {
                totalOperations: cbStats.size + rpStats.size,
                activeOperations: cbStats.size
            }
        };
    }
    forceCleanup() {
        this.circuitBreakers.cleanup();
        this.retryPolicies.cleanup();
        this.logger.log('Forced cleanup completed');
    }
    clearCache() {
        this.circuitBreakers.clear();
        this.retryPolicies.clear();
        this.logger.warn('All resilience cache cleared');
    }
    onModuleDestroy() {
        this.circuitBreakers.onModuleDestroy();
        this.retryPolicies.onModuleDestroy();
        this.logger.log('ResilienceService destroyed and cleaned up');
    }
};
exports.ResilienceService = ResilienceService;
exports.ResilienceService = ResilienceService = ResilienceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResilienceService);
//# sourceMappingURL=resilience.service.js.map