import { ResilienceService } from '../common/resilience/resilience.service';
export declare class PaymentsService {
    private resilienceService;
    constructor(resilienceService: ResilienceService);
    createPaymentIntent(amount: number, currency?: string): Promise<{
        id: string;
        amount: number;
        currency: string;
        status: string;
    } | {
        id: string;
        amount: number;
        currency: string;
        status: string;
        message: string;
    }>;
    private validatePaymentData;
    handleWebhook(payload: any, signature: string): Promise<{
        received: boolean;
    }>;
}
