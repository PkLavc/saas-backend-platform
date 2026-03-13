export declare enum CircuitState {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
    HALF_OPEN = "HALF_OPEN"
}
export interface CircuitBreakerOptions {
    failureThreshold: number;
    recoveryTimeout: number;
    monitoringPeriod: number;
}
export declare class CircuitBreaker {
    private state;
    private failureCount;
    private lastFailureTime;
    private lastSuccessTime;
    private readonly options;
    constructor(options: CircuitBreakerOptions);
    execute<T>(operation: () => Promise<T>): Promise<T>;
    private onSuccess;
    private onFailure;
    isOpen(): boolean;
    getState(): CircuitState;
    getFailureCount(): number;
    getLastFailureTime(): number;
    getLastSuccessTime(): number;
}
