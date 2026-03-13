/**
 * @public
 * @enum
 */
export declare const BehaviorOnMXFailure: {
    readonly RejectMessage: "RejectMessage";
    readonly UseDefaultValue: "UseDefaultValue";
};
/**
 * @public
 */
export type BehaviorOnMXFailure = (typeof BehaviorOnMXFailure)[keyof typeof BehaviorOnMXFailure];
/**
 * @public
 * @enum
 */
export declare const BounceType: {
    readonly ContentRejected: "ContentRejected";
    readonly DoesNotExist: "DoesNotExist";
    readonly ExceededQuota: "ExceededQuota";
    readonly MessageTooLarge: "MessageTooLarge";
    readonly TemporaryFailure: "TemporaryFailure";
    readonly Undefined: "Undefined";
};
/**
 * @public
 */
export type BounceType = (typeof BounceType)[keyof typeof BounceType];
/**
 * @public
 * @enum
 */
export declare const DsnAction: {
    readonly DELAYED: "delayed";
    readonly DELIVERED: "delivered";
    readonly EXPANDED: "expanded";
    readonly FAILED: "failed";
    readonly RELAYED: "relayed";
};
/**
 * @public
 */
export type DsnAction = (typeof DsnAction)[keyof typeof DsnAction];
/**
 * @public
 * @enum
 */
export declare const BulkEmailStatus: {
    readonly AccountDailyQuotaExceeded: "AccountDailyQuotaExceeded";
    readonly AccountSendingPaused: "AccountSendingPaused";
    readonly AccountSuspended: "AccountSuspended";
    readonly AccountThrottled: "AccountThrottled";
    readonly ConfigurationSetDoesNotExist: "ConfigurationSetDoesNotExist";
    readonly ConfigurationSetSendingPaused: "ConfigurationSetSendingPaused";
    readonly Failed: "Failed";
    readonly InvalidParameterValue: "InvalidParameterValue";
    readonly InvalidSendingPoolName: "InvalidSendingPoolName";
    readonly MailFromDomainNotVerified: "MailFromDomainNotVerified";
    readonly MessageRejected: "MessageRejected";
    readonly Success: "Success";
    readonly TemplateDoesNotExist: "TemplateDoesNotExist";
    readonly TransientFailure: "TransientFailure";
};
/**
 * @public
 */
export type BulkEmailStatus = (typeof BulkEmailStatus)[keyof typeof BulkEmailStatus];
/**
 * @public
 * @enum
 */
export declare const DimensionValueSource: {
    readonly EMAIL_HEADER: "emailHeader";
    readonly LINK_TAG: "linkTag";
    readonly MESSAGE_TAG: "messageTag";
};
/**
 * @public
 */
export type DimensionValueSource = (typeof DimensionValueSource)[keyof typeof DimensionValueSource];
/**
 * @public
 * @enum
 */
export declare const ConfigurationSetAttribute: {
    readonly DELIVERY_OPTIONS: "deliveryOptions";
    readonly EVENT_DESTINATIONS: "eventDestinations";
    readonly REPUTATION_OPTIONS: "reputationOptions";
    readonly TRACKING_OPTIONS: "trackingOptions";
};
/**
 * @public
 */
export type ConfigurationSetAttribute = (typeof ConfigurationSetAttribute)[keyof typeof ConfigurationSetAttribute];
/**
 * @public
 * @enum
 */
export declare const EventType: {
    readonly BOUNCE: "bounce";
    readonly CLICK: "click";
    readonly COMPLAINT: "complaint";
    readonly DELIVERY: "delivery";
    readonly OPEN: "open";
    readonly REJECT: "reject";
    readonly RENDERING_FAILURE: "renderingFailure";
    readonly SEND: "send";
};
/**
 * @public
 */
export type EventType = (typeof EventType)[keyof typeof EventType];
/**
 * @public
 * @enum
 */
export declare const ReceiptFilterPolicy: {
    readonly Allow: "Allow";
    readonly Block: "Block";
};
/**
 * @public
 */
export type ReceiptFilterPolicy = (typeof ReceiptFilterPolicy)[keyof typeof ReceiptFilterPolicy];
/**
 * @public
 * @enum
 */
export declare const InvocationType: {
    readonly Event: "Event";
    readonly RequestResponse: "RequestResponse";
};
/**
 * @public
 */
export type InvocationType = (typeof InvocationType)[keyof typeof InvocationType];
/**
 * @public
 * @enum
 */
export declare const SNSActionEncoding: {
    readonly Base64: "Base64";
    readonly UTF8: "UTF-8";
};
/**
 * @public
 */
export type SNSActionEncoding = (typeof SNSActionEncoding)[keyof typeof SNSActionEncoding];
/**
 * @public
 * @enum
 */
export declare const StopScope: {
    readonly RULE_SET: "RuleSet";
};
/**
 * @public
 */
export type StopScope = (typeof StopScope)[keyof typeof StopScope];
/**
 * @public
 * @enum
 */
export declare const TlsPolicy: {
    readonly Optional: "Optional";
    readonly Require: "Require";
};
/**
 * @public
 */
export type TlsPolicy = (typeof TlsPolicy)[keyof typeof TlsPolicy];
/**
 * @public
 * @enum
 */
export declare const CustomMailFromStatus: {
    readonly Failed: "Failed";
    readonly Pending: "Pending";
    readonly Success: "Success";
    readonly TemporaryFailure: "TemporaryFailure";
};
/**
 * @public
 */
export type CustomMailFromStatus = (typeof CustomMailFromStatus)[keyof typeof CustomMailFromStatus];
/**
 * @public
 * @enum
 */
export declare const VerificationStatus: {
    readonly Failed: "Failed";
    readonly NotStarted: "NotStarted";
    readonly Pending: "Pending";
    readonly Success: "Success";
    readonly TemporaryFailure: "TemporaryFailure";
};
/**
 * @public
 */
export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus];
/**
 * @public
 * @enum
 */
export declare const IdentityType: {
    readonly Domain: "Domain";
    readonly EmailAddress: "EmailAddress";
};
/**
 * @public
 */
export type IdentityType = (typeof IdentityType)[keyof typeof IdentityType];
/**
 * @public
 * @enum
 */
export declare const NotificationType: {
    readonly Bounce: "Bounce";
    readonly Complaint: "Complaint";
    readonly Delivery: "Delivery";
};
/**
 * @public
 */
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
