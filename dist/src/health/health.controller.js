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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const resilience_service_1 = require("../common/resilience/resilience.service");
let HealthController = class HealthController {
    constructor(health, http, memory, resilienceService) {
        this.health = health;
        this.http = http;
        this.memory = memory;
        this.resilienceService = resilienceService;
    }
    async check() {
        return this.health.check([
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
        ]);
    }
    async detailedHealthCheck() {
        const basicHealth = await this.health.check([
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
        ]);
        const resilienceHealth = this.resilienceService.getHealthStatus();
        const performanceMetrics = this.resilienceService.getPerformanceMetrics();
        return {
            ...basicHealth,
            resilience: {
                status: this.getResilienceStatus(resilienceHealth),
                circuitBreakers: resilienceHealth,
                performance: performanceMetrics,
            },
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
        };
    }
    async readinessCheck() {
        try {
            const readiness = await this.health.check([
                () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            ]);
            return {
                ...readiness,
                readiness: true,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                status: 'error',
                readiness: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            };
        }
    }
    async livenessCheck() {
        return {
            status: 'alive',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            pid: process.pid,
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
        };
    }
    async getResilienceHealth() {
        const healthStatus = this.resilienceService.getHealthStatus();
        const performanceMetrics = this.resilienceService.getPerformanceMetrics();
        return {
            status: this.getResilienceStatus(healthStatus),
            health: healthStatus,
            performance: performanceMetrics,
            timestamp: new Date().toISOString(),
        };
    }
    async getMetrics() {
        const performanceMetrics = this.resilienceService.getPerformanceMetrics();
        const memoryUsage = process.memoryUsage();
        const cpuUsage = process.cpuUsage();
        return {
            resilience: performanceMetrics,
            system: {
                memory: {
                    rss: memoryUsage.rss,
                    heapTotal: memoryUsage.heapTotal,
                    heapUsed: memoryUsage.heapUsed,
                    external: memoryUsage.external,
                    arrayBuffers: memoryUsage.arrayBuffers,
                },
                cpu: {
                    user: cpuUsage.user,
                    system: cpuUsage.system,
                },
                uptime: process.uptime(),
                pid: process.pid,
                version: process.version,
                platform: process.platform,
                arch: process.arch,
            },
            timestamp: new Date().toISOString(),
        };
    }
    async getCacheStats() {
        const healthStatus = this.resilienceService.getHealthStatus();
        return {
            cacheStats: healthStatus._cacheStats,
            timestamp: new Date().toISOString(),
        };
    }
    async forceCleanup() {
        this.resilienceService.forceCleanup();
        return {
            message: 'Forced cleanup completed',
            timestamp: new Date().toISOString(),
        };
    }
    async clearCache() {
        this.resilienceService.clearCache();
        return {
            message: 'All resilience cache cleared',
            timestamp: new Date().toISOString(),
        };
    }
    getResilienceStatus(healthStatus) {
        if (!healthStatus || !healthStatus._cacheStats) {
            return 'unhealthy';
        }
        const cbStats = healthStatus._cacheStats.circuitBreakers;
        const rpStats = healthStatus._cacheStats.retryPolicies;
        if (cbStats.usage > 90 || rpStats.usage > 90) {
            return 'degraded';
        }
        if (cbStats.memoryUsage.approximateSizeMB > 100 ||
            rpStats.memoryUsage.approximateSizeMB > 50) {
            return 'degraded';
        }
        for (const [name, status] of Object.entries(healthStatus)) {
            if (name.startsWith('_'))
                continue;
            if (status && typeof status === 'object' && status.state === 'OPEN') {
                return 'degraded';
            }
        }
        return 'healthy';
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('detailed'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "detailedHealthCheck", null);
__decorate([
    (0, common_1.Get)('readiness'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readinessCheck", null);
__decorate([
    (0, common_1.Get)('liveness'),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "livenessCheck", null);
__decorate([
    (0, common_1.Get)('resilience'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getResilienceHealth", null);
__decorate([
    (0, common_1.Get)('metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('cache-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getCacheStats", null);
__decorate([
    (0, common_1.Get)('force-cleanup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "forceCleanup", null);
__decorate([
    (0, common_1.Get)('clear-cache'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "clearCache", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.HttpHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        resilience_service_1.ResilienceService])
], HealthController);
//# sourceMappingURL=health.controller.js.map