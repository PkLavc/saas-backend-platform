import { HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { ResilienceService } from '../common/resilience/resilience.service';
export declare class HealthController {
    private health;
    private http;
    private memory;
    private resilienceService;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, memory: MemoryHealthIndicator, resilienceService: ResilienceService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    detailedHealthCheck(): Promise<{
        resilience: {
            status: "degraded" | "healthy" | "unhealthy";
            circuitBreakers: any;
            performance: {
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
        };
        timestamp: string;
        uptime: number;
        environment: string;
        version: string;
        status: import("@nestjs/terminus").HealthCheckStatus;
        info?: import("@nestjs/terminus").HealthIndicatorResult;
        error?: import("@nestjs/terminus").HealthIndicatorResult;
        details: import("@nestjs/terminus").HealthIndicatorResult;
    }>;
    readinessCheck(): Promise<{
        readiness: boolean;
        timestamp: string;
        status: import("@nestjs/terminus").HealthCheckStatus;
        info?: import("@nestjs/terminus").HealthIndicatorResult;
        error?: import("@nestjs/terminus").HealthIndicatorResult;
        details: import("@nestjs/terminus").HealthIndicatorResult;
    } | {
        status: string;
        readiness: boolean;
        error: any;
        timestamp: string;
    }>;
    livenessCheck(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        pid: number;
        memory: NodeJS.MemoryUsage;
        cpu: NodeJS.CpuUsage;
    }>;
    getResilienceHealth(): Promise<{
        status: "degraded" | "healthy" | "unhealthy";
        health: any;
        performance: {
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
        timestamp: string;
    }>;
    getMetrics(): Promise<{
        resilience: {
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
        system: {
            memory: {
                rss: number;
                heapTotal: number;
                heapUsed: number;
                external: number;
                arrayBuffers: number;
            };
            cpu: {
                user: number;
                system: number;
            };
            uptime: number;
            pid: number;
            version: string;
            platform: NodeJS.Platform;
            arch: NodeJS.Architecture;
        };
        timestamp: string;
    }>;
    getCacheStats(): Promise<{
        cacheStats: any;
        timestamp: string;
    }>;
    forceCleanup(): Promise<{
        message: string;
        timestamp: string;
    }>;
    clearCache(): Promise<{
        message: string;
        timestamp: string;
    }>;
    private getResilienceStatus;
}
