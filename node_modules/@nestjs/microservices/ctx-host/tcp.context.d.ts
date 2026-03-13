import { TcpSocket } from '../helpers';
import { BaseRpcContext } from './base-rpc.context';
type TcpContextArgs = [TcpSocket, string];
/**
 * @publicApi
 */
export declare class TcpContext extends BaseRpcContext<TcpContextArgs> {
    constructor(args: TcpContextArgs);
    /**
     * Returns the underlying JSON socket.
     */
    getSocketRef(): TcpSocket;
    /**
     * Returns the name of the pattern.
     */
    getPattern(): string;
}
export {};
