import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createIntent(body: {
        amount: number;
        currency?: string;
    }): Promise<{
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
    handleWebhook(payload: any, signature: string): Promise<{
        received: boolean;
    }>;
}
