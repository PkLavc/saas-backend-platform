import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    private logException;
    private sanitizeMessage;
    private sanitizeHeaders;
    private sanitizeBody;
    private handlePrismaError;
}
