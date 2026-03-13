import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  ConflictException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library';

interface SanitizedError {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  error: string;
  message: string | string[];
  // Only include stack trace in development
  stack?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine if running in production
    const isProduction = process.env.NODE_ENV === 'production';

    let status: number;
    let message: string | string[];
    let error: string;
    let stack: string | undefined;

    // Log the exception with full details for internal monitoring
    this.logException(exception, request);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = this.sanitizeMessage(
        typeof exceptionResponse === 'string' 
          ? exceptionResponse 
          : (exceptionResponse as any).message || exception.message,
        isProduction
      );
      error = exception.name;
      stack = !isProduction ? exception.stack : undefined;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      const prismaError = this.handlePrismaError(exception, isProduction);
      status = prismaError.status;
      message = prismaError.message;
      error = 'Database Error';
      stack = !isProduction ? exception.stack : undefined;
    } else if (exception instanceof PrismaClientInitializationError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = isProduction 
        ? 'Service temporarily unavailable'
        : 'Database connection failed';
      error = 'Service Unavailable';
      stack = !isProduction ? exception.stack : undefined;
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = isProduction 
        ? 'An unexpected error occurred'
        : exception.message;
      error = 'Internal Server Error';
      stack = !isProduction ? exception.stack : undefined;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = isProduction 
        ? 'An unexpected error occurred'
        : 'Unknown error occurred';
      error = 'Unknown Error';
      stack = undefined;
    }

    // Enhanced error response with SOC2 compliance
    const errorResponse: SanitizedError = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
      ...(stack && { stack }), // Only include stack in development
    };

    // Log sanitized error for monitoring
    this.logger.error(
      `HTTP ${status} - ${error}: ${Array.isArray(message) ? message.join(', ') : message}`,
      {
        path: request.url,
        method: request.method,
        statusCode: status,
        error,
        timestamp: errorResponse.timestamp,
      }
    );

    response.status(status).json(errorResponse);
  }

  private logException(exception: unknown, request: Request): void {
    const errorObj = exception as Error;
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

    // Always log full exception details for internal monitoring
    this.logger.error(
      `Exception occurred: ${errorObj.constructor.name}: ${errorObj.message}`,
      logData
    );
  }

  private sanitizeMessage(message: string | string[], isProduction: boolean): string | string[] {
    if (isProduction) {
      // Remove sensitive information in production
      const sensitivePatterns = [
        /password/gi,
        /token/gi,
        /secret/gi,
        /key/gi,
        /credential/gi,
        /auth/gi,
      ];

      if (Array.isArray(message)) {
        return message.map(msg => 
          sensitivePatterns.reduce((acc, pattern) => 
            acc.replace(pattern, '[REDACTED]'), msg
          )
        );
      }

      return sensitivePatterns.reduce((acc, pattern) => 
        acc.replace(pattern, '[REDACTED]'), message
      );
    }

    return message;
  }

  private sanitizeHeaders(headers: any): any {
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

  private sanitizeBody(body: any): any {
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

  private handlePrismaError(error: PrismaClientKnownRequestError, isProduction: boolean): { status: number; message: string | string[] } {
    let status: number;
    let message: string;

    switch (error.code) {
      case 'P2002': // Unique constraint violation
        status = HttpStatus.CONFLICT;
        message = isProduction 
          ? 'Resource already exists'
          : `Unique constraint violation: ${error.meta?.target}`;
        break;
      case 'P2003': // Foreign key constraint violation
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid reference data'
          : `Foreign key constraint violation: ${error.meta?.field_name}`;
        break;
      case 'P2025': // Record not found
        status = HttpStatus.NOT_FOUND;
        message = isProduction 
          ? 'Resource not found'
          : `Record not found: ${error.meta?.cause}`;
        break;
      case 'P2010': // Raw query failed
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid request'
          : `Raw query failed: ${error.meta?.cause}`;
        break;
      case 'P2011': // Null constraint violation
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Missing required data'
          : `Null constraint violation: ${error.meta?.field_name}`;
        break;
      case 'P2012': // Missing required value
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Missing required data'
          : `Missing required value: ${error.meta?.field_name}`;
        break;
      case 'P2013': // Missing required argument
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid request format'
          : `Missing required argument: ${error.meta?.argument}`;
        break;
      case 'P2014': // Relation violation
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid relationship data'
          : `Relation violation: ${error.meta?.relation_name}`;
        break;
      case 'P2015': // Related record not found
        status = HttpStatus.NOT_FOUND;
        message = isProduction 
          ? 'Related resource not found'
          : `Related record not found: ${error.meta?.cause}`;
        break;
      case 'P2016': // Record to update not found
        status = HttpStatus.NOT_FOUND;
        message = isProduction 
          ? 'Resource not found for update'
          : `Record to update not found: ${error.meta?.cause}`;
        break;
      case 'P2017': // Data validation error
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid data format'
          : `Data validation error: ${error.meta?.cause}`;
        break;
      case 'P2018': // Transaction API error
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = isProduction 
          ? 'Service temporarily unavailable'
          : `Transaction API error: ${error.meta?.cause}`;
        break;
      case 'P2019': // Invalid input syntax
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid input format'
          : `Invalid input syntax: ${error.meta?.cause}`;
        break;
      case 'P2020': // Value out of range
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Invalid value range'
          : `Value out of range: ${error.meta?.cause}`;
        break;
      case 'P2021': // Table does not exist
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = isProduction 
          ? 'Service configuration error'
          : `Table does not exist: ${error.meta?.table}`;
        break;
      case 'P2022': // Column does not exist
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = isProduction 
          ? 'Service configuration error'
          : `Column does not exist: ${error.meta?.column}`;
        break;
      case 'P2023': // Inconsistent column data
        status = HttpStatus.BAD_REQUEST;
        message = isProduction 
          ? 'Data format error'
          : `Inconsistent column data: ${error.meta?.column}`;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = isProduction 
          ? 'An unexpected database error occurred'
          : error.message || 'Database error occurred';
    }

    return { status, message };
  }
}