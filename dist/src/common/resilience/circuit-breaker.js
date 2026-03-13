"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = exports.CircuitState = void 0;
var CircuitState;
(function (CircuitState) {
    CircuitState["CLOSED"] = "CLOSED";
    CircuitState["OPEN"] = "OPEN";
    CircuitState["HALF_OPEN"] = "HALF_OPEN";
})(CircuitState || (exports.CircuitState = CircuitState = {}));
class CircuitBreaker {
    constructor(options) {
        this.state = CircuitState.CLOSED;
        this.failureCount = 0;
        this.lastFailureTime = 0;
        this.lastSuccessTime = 0;
        this.options = options;
    }
    async execute(operation) {
        if (this.isOpen()) {
            throw new Error('Circuit breaker is open');
        }
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        }
        catch (error) {
            this.onFailure();
            throw error;
        }
    }
    onSuccess() {
        this.failureCount = 0;
        this.lastSuccessTime = Date.now();
        if (this.state === CircuitState.HALF_OPEN) {
            this.state = CircuitState.CLOSED;
        }
    }
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        if (this.failureCount >= this.options.failureThreshold) {
            this.state = CircuitState.OPEN;
        }
    }
    isOpen() {
        if (this.state === CircuitState.CLOSED) {
            return false;
        }
        if (this.state === CircuitState.OPEN) {
            const now = Date.now();
            if (now - this.lastFailureTime >= this.options.recoveryTimeout) {
                this.state = CircuitState.HALF_OPEN;
                return false;
            }
            return true;
        }
        return false;
    }
    getState() {
        return this.state;
    }
    getFailureCount() {
        return this.failureCount;
    }
    getLastFailureTime() {
        return this.lastFailureTime;
    }
    getLastSuccessTime() {
        return this.lastSuccessTime;
    }
}
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuit-breaker.js.map