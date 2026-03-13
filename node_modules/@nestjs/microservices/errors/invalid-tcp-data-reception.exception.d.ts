import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
export declare class InvalidTcpDataReceptionException extends RuntimeException {
    constructor(err: string | Error);
}
