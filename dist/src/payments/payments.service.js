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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const resilience_service_1 = require("../common/resilience/resilience.service");
let PaymentsService = class PaymentsService {
    constructor(resilienceService) {
        this.resilienceService = resilienceService;
    }
    async createPaymentIntent(amount, currency = 'usd') {
        this.validatePaymentData(amount, currency);
        return this.resilienceService.execute('payment-service', async () => {
            try {
                const mockResponse = {
                    id: 'pi_mock_' + Date.now(),
                    amount,
                    currency,
                    status: 'succeeded',
                };
                return mockResponse;
            }
            catch (error) {
                console.error('Payment service failed:', error.message);
                return {
                    id: 'pi_degraded_' + Date.now(),
                    amount,
                    currency,
                    status: 'degraded',
                    message: 'Payment processing temporarily unavailable, will retry asynchronously'
                };
            }
        }, {
            circuitBreaker: {
                failureThreshold: 3,
                recoveryTimeout: 30000,
                monitoringPeriod: 10000,
            },
            retry: {
                maxAttempts: 2,
                baseDelay: 1000,
                maxDelay: 5000,
            }
        });
    }
    validatePaymentData(amount, currency) {
        if (!amount || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }
        if (!currency || typeof currency !== 'string') {
            throw new Error('Currency must be a valid string');
        }
        const supportedCurrencies = ['usd', 'eur', 'brl', 'gbp'];
        if (!supportedCurrencies.includes(currency.toLowerCase())) {
            throw new Error(`Currency ${currency} is not supported. Supported: ${supportedCurrencies.join(', ')}`);
        }
        if (amount < 50) {
            throw new Error('Amount must be at least 50 cents');
        }
    }
    async handleWebhook(payload, signature) {
        return this.resilienceService.execute('payment-webhook', async () => {
            console.log('Webhook received:', payload);
            return { received: true };
        }, {
            circuitBreaker: {
                failureThreshold: 3,
                recoveryTimeout: 30000,
                monitoringPeriod: 10000,
            },
            retry: {
                maxAttempts: 2,
                baseDelay: 1000,
                maxDelay: 5000,
            }
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resilience_service_1.ResilienceService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map