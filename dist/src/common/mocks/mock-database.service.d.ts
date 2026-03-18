export declare class MockDatabaseService {
    private readonly logger;
    private isAvailable;
    private dataStore;
    private counters;
    constructor();
    private initializeMockData;
    connect(): Promise<void>;
    findMany<T>(model: string, where?: any): Promise<T[]>;
    findUnique<T>(model: string, where: any): Promise<T | null>;
    create<T>(model: string, data: any): Promise<T>;
    update<T>(model: string, where: any, data: any): Promise<T>;
    delete<T>(model: string, where: any): Promise<T>;
    count(model: string, where?: any): Promise<number>;
    private getNextId;
    getAvailability(): boolean;
    $transaction<T>(fn: (tx: any) => Promise<T>): Promise<T>;
    findManyWithFallback<T>(model: string, where?: any): Promise<T[]>;
    createWithFallback<T>(model: string, data: any): Promise<T | null>;
}
