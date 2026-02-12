import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  createIntent(@Body() body: { amount: number; currency?: string }) {
    return this.paymentsService.createPaymentIntent(body.amount, body.currency);
  }

  @Post('webhook')
  handleWebhook(@Body() payload: any, @Headers('stripe-signature') signature: string) {
    return this.paymentsService.handleWebhook(payload, signature);
  }
}