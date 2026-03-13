import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MemoryHealthIndicator } from '@nestjs/terminus';
import { ResilienceService } from '../common/resilience/resilience.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private resilienceService: ResilienceService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      // Memory health check
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB threshold
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),   // 300MB threshold
      
      // External service health checks would go here
      // () => this.http.pingCheck('redis', 'http://localhost:6379'),
      // () => this.http.pingCheck('stripe', 'https://api.stripe.com'),
    ]);
  }

  @Get('detailed')
  @HealthCheck()
  async detailedHealthCheck() {
    const basicHealth = await this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);

    // Add resilience service health metrics
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

  @Get('readiness')
  @HealthCheck()
  async readinessCheck() {
    try {
      const readiness = await this.health.check([
        // Memory must be within limits
        () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      ]);

      return {
        ...readiness,
        readiness: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        readiness: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('liveness')
  @HealthCheck()
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

  @Get('resilience')
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

  @Get('metrics')
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

  @Get('cache-stats')
  async getCacheStats() {
    const healthStatus = this.resilienceService.getHealthStatus();
    
    return {
      cacheStats: healthStatus._cacheStats,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('force-cleanup')
  async forceCleanup() {
    this.resilienceService.forceCleanup();
    
    return {
      message: 'Forced cleanup completed',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('clear-cache')
  async clearCache() {
    this.resilienceService.clearCache();
    
    return {
      message: 'All resilience cache cleared',
      timestamp: new Date().toISOString(),
    };
  }

  private getResilienceStatus(healthStatus: any): 'healthy' | 'degraded' | 'unhealthy' {
    if (!healthStatus || !healthStatus._cacheStats) {
      return 'unhealthy';
    }

    const cbStats = healthStatus._cacheStats.circuitBreakers;
    const rpStats = healthStatus._cacheStats.retryPolicies;

    // Check if cache usage is too high
    if (cbStats.usage > 90 || rpStats.usage > 90) {
      return 'degraded';
    }

    // Check memory usage
    if (cbStats.memoryUsage.approximateSizeMB > 100 || 
        rpStats.memoryUsage.approximateSizeMB > 50) {
      return 'degraded';
    }

    // Check if any circuit breakers are open
    for (const [name, status] of Object.entries(healthStatus)) {
      if (name.startsWith('_')) continue;
      
      if (status && typeof status === 'object' && (status as any).state === 'OPEN') {
        return 'degraded';
      }
    }

    return 'healthy';
  }
}