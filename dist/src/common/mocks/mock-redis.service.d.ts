export declare class MockRedisService {
    private readonly logger;
    private store;
    private isAvailable;
    constructor();
    connect(): Promise<void>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    get(key: string): Promise<any>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    flushall(): Promise<void>;
    ping(): Promise<string>;
    getAvailability(): boolean;
    setWithFallback(key: string, value: any, ttl?: number): Promise<void>;
    getWithFallback(key: string): Promise<any>;
}
