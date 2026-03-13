import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResilienceService } from '../common/resilience/resilience.service';

@Injectable()
export class PaymentsService {
  constructor(private resilienceService: ResilienceService) {}

  async createPaymentIntent(amount: number, currency: string = 'usd') {
    // Validação robusta de pagamentos
    this.validatePaymentData(amount, currency);
    
    return this.resilienceService.execute(
      'payment-service',
      async () => {
        try {
          // Mock Stripe API
          const mockResponse = {
            id: 'pi_mock_' + Date.now(),
            amount,
            currency,
            status: 'succeeded',
          };
          
          // Simulação de chamada externa ao Stripe
          // const response = await axios.post('https://api.stripe.com/v1/payment_intents', {
          //   amount,
          //   currency,
          //   payment_method_types: ['card']
          // }, {
          //   headers: {
          //     'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   }
          // });
          
          return mockResponse;
        } catch (error) {
          // Tratamento de falhas externas
          console.error('Payment service failed:', error.message);
          
          // Retornar status degradado em vez de erro 500
          return {
            id: 'pi_degraded_' + Date.now(),
            amount,
            currency,
            status: 'degraded',
            message: 'Payment processing temporarily unavailable, will retry asynchronously'
          };
        }
      },
      {
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
      }
    );
  }

  private validatePaymentData(amount: number, currency: string) {
    if (!amount || amount <= 0) {
      throw new Error('Amount must be a positive number');
    }
    
    if (!currency || typeof currency !== 'string') {
      throw new Error('Currency must be a valid string');
    }
    
    // Lista de moedas suportadas
    const supportedCurrencies = ['usd', 'eur', 'brl', 'gbp'];
    if (!supportedCurrencies.includes(currency.toLowerCase())) {
      throw new Error(`Currency ${currency} is not supported. Supported: ${supportedCurrencies.join(', ')}`);
    }
    
    // Validação de valor mínimo
    if (amount < 50) { // Valor mínimo de 50 centavos
      throw new Error('Amount must be at least 50 cents');
    }
  }

  async handleWebhook(payload: any, signature: string) {
    return this.resilienceService.execute(
      'payment-webhook',
      async () => {
        // Verify signature in real app
        // Process webhook
        console.log('Webhook received:', payload);
        return { received: true };
      },
      {
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
      }
    );
  }
}
