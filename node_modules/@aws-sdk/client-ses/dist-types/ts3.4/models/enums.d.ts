export declare const BehaviorOnMXFailure: {
  readonly RejectMessage: "RejectMessage";
  readonly UseDefaultValue: "UseDefaultValue";
};
export type BehaviorOnMXFailure =
  (typeof BehaviorOnMXFailure)[keyof typeof BehaviorOnMXFailure];
export declare const BounceType: {
  readonly ContentRejected: "ContentRejected";
  readonly DoesNotExist: "DoesNotExist";
  readonly ExceededQuota: "ExceededQuota";
  readonly MessageTooLarge: "MessageTooLarge";
  readonly TemporaryFailure: "TemporaryFailure";
  readonly Undefined: "Undefined";
};
export type BounceType = (typeof BounceType)[keyof typeof BounceType];
export declare const DsnAction: {
  readonly DELAYED: "delayed";
  readonly DELIVERED: "delivered";
  readonly EXPANDED: "expanded";
  readonly FAILED: "failed";
  readonly RELAYED: "relayed";
};
export type DsnAction = (typeof DsnAction)[keyof typeof DsnAction];
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
export type BulkEmailStatus =
  (typeof BulkEmailStatus)[keyof typeof BulkEmailStatus];
export declare const DimensionValueSource: {
  readonly EMAIL_HEADER: "emailHeader";
  readonly LINK_TAG: "linkTag";
  readonly MESSAGE_TAG: "messageTag";
};
export type DimensionValueSource =
  (typeof DimensionValueSource)[keyof typeof DimensionValueSource];
export declare const ConfigurationSetAttribute: {
  readonly DELIVERY_OPTIONS: "deliveryOptions";
  readonly EVENT_DESTINATIONS: "eventDestinations";
  readonly REPUTATION_OPTIONS: "reputationOptions";
  readonly TRACKING_OPTIONS: "trackingOptions";
};
export type ConfigurationSetAttribute =
  (typeof ConfigurationSetAttribute)[keyof typeof ConfigurationSetAttribute];
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
export type EventType = (typeof EventType)[keyof typeof EventType];
export declare const ReceiptFilterPolicy: {
  readonly Allow: "Allow";
  readonly Block: "Block";
};
export type ReceiptFilterPolicy =
  (typeof ReceiptFilterPolicy)[keyof typeof ReceiptFilterPolicy];
export declare const InvocationType: {
  readonly Event: "Event";
  readonly RequestResponse: "RequestResponse";
};
export type InvocationType =
  (typeof InvocationType)[keyof typeof InvocationType];
export declare const SNSActionEncoding: {
  readonly Base64: "Base64";
  readonly UTF8: "UTF-8";
};
export type SNSActionEncoding =
  (typeof SNSActionEncoding)[keyof typeof SNSActionEncoding];
export declare const StopScope: {
  readonly RULE_SET: "RuleSet";
};
export type StopScope = (typeof StopScope)[keyof typeof StopScope];
export declare const TlsPolicy: {
  readonly Optional: "Optional";
  readonly Require: "Require";
};
export type TlsPolicy = (typeof TlsPolicy)[keyof typeof TlsPolicy];
export declare const CustomMailFromStatus: {
  readonly Failed: "Failed";
  readonly Pending: "Pending";
  readonly Success: "Success";
  readonly TemporaryFailure: "TemporaryFailure";
};
export type CustomMailFromStatus =
  (typeof CustomMailFromStatus)[keyof typeof CustomMailFromStatus];
export declare const VerificationStatus: {
  readonly Failed: "Failed";
  readonly NotStarted: "NotStarted";
  readonly Pending: "Pending";
  readonly Success: "Success";
  readonly TemporaryFailure: "TemporaryFailure";
};
export type VerificationStatus =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];
export declare const IdentityType: {
  readonly Domain: "Domain";
  readonly EmailAddress: "EmailAddress";
};
export type IdentityType = (typeof IdentityType)[keyof typeof IdentityType];
export declare const NotificationType: {
  readonly Bounce: "Bounce";
  readonly Complaint: "Complaint";
  readonly Delivery: "Delivery";
};
export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
