export declare class LRUCacheService {
    private readonly logger;
    private cache;
    private maxSize;
    private defaultTTL;
    private cleanupInterval;
    constructor();
    set<T>(key: string, value: T, ttl?: number): void;
    get<T>(key: string): T | null;
    has(key: string): boolean;
    delete(key: string): boolean;
    clear(): void;
    getStats(): {
        size: number;
        maxSize: number;
        usage: number;
        oldestEntry: number | null;
        newestEntry: number | null;
    };
    evictLRU(): void;
    cleanup(): void;
    getMemoryUsage(): {
        approximateSizeMB: number;
        entryCount: number;
        averageEntrySizeBytes: number;
    };
    onModuleDestroy(): void;
}
