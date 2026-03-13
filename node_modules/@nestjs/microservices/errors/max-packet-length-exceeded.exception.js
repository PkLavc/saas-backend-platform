"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxPacketLengthExceededException = void 0;
/**
 * @publicApi
 */
class MaxPacketLengthExceededException extends Error {
    constructor(length) {
        super(`The packet length (${length}) exceeds the maximum allowed length`);
    }
}
exports.MaxPacketLengthExceededException = MaxPacketLengthExceededException;
