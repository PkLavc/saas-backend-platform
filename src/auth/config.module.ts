import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required().description('PostgreSQL database URL'),
        JWT_SECRET: Joi.string().required().min(32).description('JWT secret key'),
        REDIS_URL: Joi.string().optional().description('Redis connection URL (optional for fallback)'),
        STRIPE_SECRET_KEY: Joi.string().optional().description('Stripe secret key'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigModule {}
