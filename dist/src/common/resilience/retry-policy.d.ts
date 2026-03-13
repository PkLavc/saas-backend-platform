export interface RetryPolicyOptions {
    maxAttempts: number;
    baseDelay: number;
    maxDelay: number;
    backoffMultiplier: number;
}
export declare class RetryPolicy {
    private readonly options;
    constructor(options: RetryPolicyOptions);
    execute<T>(operation: () => Promise<T>): Promise<T>;
    private calculateDelay;
    private sleep;
}
