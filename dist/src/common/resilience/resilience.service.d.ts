import { OnModuleDestroy } from '@nestjs/common';
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
export declare class ResilienceService implements OnModuleDestroy {
    private readonly logger;
    private circuitBreakers;
    private retryPolicies;
    constructor();
    execute<T>(operationName: string, operation: () => Promise<T>, options?: ResilienceOptions): Promise<T>;
    private getRetryPolicy;
    getHealthStatus(): any;
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
    };
    forceCleanup(): void;
    clearCache(): void;
    onModuleDestroy(): void;
}
