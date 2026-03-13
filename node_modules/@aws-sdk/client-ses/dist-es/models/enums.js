export const BehaviorOnMXFailure = {
    RejectMessage: "RejectMessage",
    UseDefaultValue: "UseDefaultValue",
};
export const BounceType = {
    ContentRejected: "ContentRejected",
    DoesNotExist: "DoesNotExist",
    ExceededQuota: "ExceededQuota",
    MessageTooLarge: "MessageTooLarge",
    TemporaryFailure: "TemporaryFailure",
    Undefined: "Undefined",
};
export const DsnAction = {
    DELAYED: "delayed",
    DELIVERED: "delivered",
    EXPANDED: "expanded",
    FAILED: "failed",
    RELAYED: "relayed",
};
export const BulkEmailStatus = {
    AccountDailyQuotaExceeded: "AccountDailyQuotaExceeded",
    AccountSendingPaused: "AccountSendingPaused",
    AccountSuspended: "AccountSuspended",
    AccountThrottled: "AccountThrottled",
    ConfigurationSetDoesNotExist: "ConfigurationSetDoesNotExist",
    ConfigurationSetSendingPaused: "ConfigurationSetSendingPaused",
    Failed: "Failed",
    InvalidParameterValue: "InvalidParameterValue",
    InvalidSendingPoolName: "InvalidSendingPoolName",
    MailFromDomainNotVerified: "MailFromDomainNotVerified",
    MessageRejected: "MessageRejected",
    Success: "Success",
    TemplateDoesNotExist: "TemplateDoesNotExist",
    TransientFailure: "TransientFailure",
};
export const DimensionValueSource = {
    EMAIL_HEADER: "emailHeader",
    LINK_TAG: "linkTag",
    MESSAGE_TAG: "messageTag",
};
export const ConfigurationSetAttribute = {
    DELIVERY_OPTIONS: "deliveryOptions",
    EVENT_DESTINATIONS: "eventDestinations",
    REPUTATION_OPTIONS: "reputationOptions",
    TRACKING_OPTIONS: "trackingOptions",
};
export const EventType = {
    BOUNCE: "bounce",
    CLICK: "click",
    COMPLAINT: "complaint",
    DELIVERY: "delivery",
    OPEN: "open",
    REJECT: "reject",
    RENDERING_FAILURE: "renderingFailure",
    SEND: "send",
};
export const ReceiptFilterPolicy = {
    Allow: "Allow",
    Block: "Block",
};
export const InvocationType = {
    Event: "Event",
    RequestResponse: "RequestResponse",
};
export const SNSActionEncoding = {
    Base64: "Base64",
    UTF8: "UTF-8",
};
export const StopScope = {
    RULE_SET: "RuleSet",
};
export const TlsPolicy = {
    Optional: "Optional",
    Require: "Require",
};
export const CustomMailFromStatus = {
    Failed: "Failed",
    Pending: "Pending",
    Success: "Success",
    TemporaryFailure: "TemporaryFailure",
};
export const VerificationStatus = {
    Failed: "Failed",
    NotStarted: "NotStarted",
    Pending: "Pending",
    Success: "Success",
    TemporaryFailure: "TemporaryFailure",
};
export const IdentityType = {
    Domain: "Domain",
    EmailAddress: "EmailAddress",
};
export const NotificationType = {
    Bounce: "Bounce",
    Complaint: "Complaint",
    Delivery: "Delivery",
};
