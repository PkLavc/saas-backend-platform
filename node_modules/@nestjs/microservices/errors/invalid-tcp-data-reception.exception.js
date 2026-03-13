"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTcpDataReceptionException = void 0;
const runtime_exception_1 = require("@nestjs/core/errors/exceptions/runtime.exception");
class InvalidTcpDataReceptionException extends runtime_exception_1.RuntimeException {
    constructor(err) {
        const errMsgStr = typeof err === 'string'
            ? err
            : err &&
                typeof err === 'object' &&
                'message' in err &&
                typeof err.message === 'string'
                ? err.message
                : String(err);
        const _errMsg = errMsgStr.includes('Corrupted length value')
            ? `Corrupted length value of the received data supplied in a packet`
            : `The invalid received message from tcp server`;
        super(_errMsg);
    }
}
exports.InvalidTcpDataReceptionException = InvalidTcpDataReceptionException;
