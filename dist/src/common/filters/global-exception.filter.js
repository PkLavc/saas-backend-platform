"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const isProduction = process.env.NODE_ENV === 'production';
        let status;
        let message;
        let error;
        let stack;
        this.logException(exception, request);
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = this.sanitizeMessage(typeof exceptionResponse === 'string'
                ? exceptionResponse
                : exceptionResponse.message || exception.message, isProduction);
            error = exception.name;
            stack = !isProduction ? exception.stack : undefined;
        }
        else if (exception instanceof library_1.PrismaClientKnownRequestError) {
            const prismaError = this.handlePrismaError(exception, isProduction);
            status = prismaError.status;
            message = prismaError.message;
            error = 'Database Error';
            stack = !isProduction ? exception.stack : undefined;
        }
        else if (exception instanceof library_1.PrismaClientInitializationError) {
            status = common_1.HttpStatus.SERVICE_UNAVAILABLE;
            message = isProduction
                ? 'Service temporarily unavailable'
                : 'Database connection failed';
            error = 'Service Unavailable';
            stack = !isProduction ? exception.stack : undefined;
        }
        else if (exception instanceof Error) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = isProduction
                ? 'An unexpected error occurred'
                : exception.message;
            error = 'Internal Server Error';
            stack = !isProduction ? exception.stack : undefined;
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = isProduction
                ? 'An unexpected error occurred'
                : 'Unknown error occurred';
            error = 'Unknown Error';
            stack = undefined;
        }
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            error,
            message,
            ...(stack && { stack }),
        };
        this.logger.error(`HTTP ${status} - ${error}: ${Array.isArray(message) ? message.join(', ') : message}`, {
            path: request.url,
            method: request.method,
            statusCode: status,
            error,
            timestamp: errorResponse.timestamp,
        });
        response.status(status).json(errorResponse);
    }
    logException(exception, request) {
        const errorObj = exception;
        const logData = {
            errorName: errorObj.constructor.name,
            errorMessage: errorObj.message,
            stack: errorObj.stack,
            request: {
                url: request.url,
                method: request.method,
                headers: this.sanitizeHeaders(request.headers),
                body: this.sanitizeBody(request.body),
                query: request.query,
                params: request.params,
            },
            timestamp: new Date().toISOString(),
            userAgent: request.get('User-Agent'),
            ip: request.ip,
        };
        this.logger.error(`Exception occurred: ${errorObj.constructor.name}: ${errorObj.message}`, logData);
    }
    sanitizeMessage(message, isProduction) {
        if (isProduction) {
            const sensitivePatterns = [
                /password/gi,
                /token/gi,
                /secret/gi,
                /key/gi,
                /credential/gi,
                /auth/gi,
            ];
            if (Array.isArray(message)) {
                return message.map(msg => sensitivePatterns.reduce((acc, pattern) => acc.replace(pattern, '[REDACTED]'), msg));
            }
            return sensitivePatterns.reduce((acc, pattern) => acc.replace(pattern, '[REDACTED]'), message);
        }
        return message;
    }
    sanitizeHeaders(headers) {
        const sanitized = { ...headers };
        const sensitiveHeaders = [
            'authorization',
            'x-api-key',
            'x-auth-token',
            'cookie',
            'x-api-secret',
        ];
        sensitiveHeaders.forEach(header => {
            if (sanitized[header]) {
                sanitized[header] = '[REDACTED]';
            }
        });
        return sanitized;
    }
    sanitizeBody(body) {
        if (!body || typeof body !== 'object') {
            return body;
        }
        const sanitized = { ...body };
        const sensitiveFields = [
            'password',
            'token',
            'secret',
            'apiKey',
            'authToken',
            'credentials',
            'privateKey',
            'creditCard',
            'ssn',
            'socialSecurityNumber',
        ];
        sensitiveFields.forEach(field => {
            if (sanitized[field]) {
                sanitized[field] = '[REDACTED]';
            }
        });
        return sanitized;
    }
    handlePrismaError(error, isProduction) {
        let status;
        let message;
        switch (error.code) {
            case 'P2002':
                status = common_1.HttpStatus.CONFLICT;
                message = isProduction
                    ? 'Resource already exists'
                    : `Unique constraint violation: ${error.meta?.target}`;
                break;
            case 'P2003':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid reference data'
                    : `Foreign key constraint violation: ${error.meta?.field_name}`;
                break;
            case 'P2025':
                status = common_1.HttpStatus.NOT_FOUND;
                message = isProduction
                    ? 'Resource not found'
                    : `Record not found: ${error.meta?.cause}`;
                break;
            case 'P2010':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid request'
                    : `Raw query failed: ${error.meta?.cause}`;
                break;
            case 'P2011':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Missing required data'
                    : `Null constraint violation: ${error.meta?.field_name}`;
                break;
            case 'P2012':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Missing required data'
                    : `Missing required value: ${error.meta?.field_name}`;
                break;
            case 'P2013':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid request format'
                    : `Missing required argument: ${error.meta?.argument}`;
                break;
            case 'P2014':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid relationship data'
                    : `Relation violation: ${error.meta?.relation_name}`;
                break;
            case 'P2015':
                status = common_1.HttpStatus.NOT_FOUND;
                message = isProduction
                    ? 'Related resource not found'
                    : `Related record not found: ${error.meta?.cause}`;
                break;
            case 'P2016':
                status = common_1.HttpStatus.NOT_FOUND;
                message = isProduction
                    ? 'Resource not found for update'
                    : `Record to update not found: ${error.meta?.cause}`;
                break;
            case 'P2017':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid data format'
                    : `Data validation error: ${error.meta?.cause}`;
                break;
            case 'P2018':
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = isProduction
                    ? 'Service temporarily unavailable'
                    : `Transaction API error: ${error.meta?.cause}`;
                break;
            case 'P2019':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid input format'
                    : `Invalid input syntax: ${error.meta?.cause}`;
                break;
            case 'P2020':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Invalid value range'
                    : `Value out of range: ${error.meta?.cause}`;
                break;
            case 'P2021':
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = isProduction
                    ? 'Service configuration error'
                    : `Table does not exist: ${error.meta?.table}`;
                break;
            case 'P2022':
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = isProduction
                    ? 'Service configuration error'
                    : `Column does not exist: ${error.meta?.column}`;
                break;
            case 'P2023':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = isProduction
                    ? 'Data format error'
                    : `Inconsistent column data: ${error.meta?.column}`;
                break;
            default:
                status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                message = isProduction
                    ? 'An unexpected database error occurred'
                    : error.message || 'Database error occurred';
        }
        return { status, message };
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map