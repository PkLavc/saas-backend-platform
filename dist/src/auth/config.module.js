"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
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
], ConfigModule);
//# sourceMappingURL=config.module.js.map