"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryPolicy = void 0;
class RetryPolicy {
    constructor(options) {
        this.options = options;
    }
    async execute(operation) {
        let lastError;
        for (let attempt = 0; attempt < this.options.maxAttempts; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                if (attempt === this.options.maxAttempts - 1) {
                    throw lastError;
                }
                const delay = this.calculateDelay(attempt);
                await this.sleep(delay);
            }
        }
        throw lastError;
    }
    calculateDelay(attempt) {
        const exponentialDelay = this.options.baseDelay * Math.pow(this.options.backoffMultiplier, attempt);
        return Math.min(exponentialDelay, this.options.maxDelay);
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.RetryPolicy = RetryPolicy;
//# sourceMappingURL=retry-policy.js.map