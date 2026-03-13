type VoidCallback = () => void;
type OnPacketCallback = (packet: any) => void;
type OnErrorCallback = (error: Error) => void;
export declare const enum MqttStatus {
    DISCONNECTED = "disconnected",
    RECONNECTING = "reconnecting",
    CONNECTED = "connected",
    CLOSED = "closed"
}
export declare const enum MqttEventsMap {
    CONNECT = "connect",
    RECONNECT = "reconnect",
    DISCONNECT = "disconnect",
    CLOSE = "close",
    OFFLINE = "offline",
    END = "end",
    ERROR = "error",
    PACKETRECEIVE = "packetreceive",
    PACKETSEND = "packetsend"
}
/**
 * MQTT events map for the MQTT client.
 * Key is the event name and value is the corresponding callback function.
 * @publicApi
 */
export type MqttEvents = {
    connect: OnPacketCallback;
    reconnect: VoidCallback;
    disconnect: OnPacketCallback;
    close: VoidCallback;
    offline: VoidCallback;
    end: VoidCallback;
    error: OnErrorCallback;
    packetreceive: OnPacketCallback;
    packetsend: OnPacketCallback;
};
export {};
