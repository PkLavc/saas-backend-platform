import type { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { SESServiceException as __BaseException } from "./SESServiceException";
/**
 * <p>Indicates that email sending is disabled for your entire Amazon SES account.</p>
 *          <p>You can enable or disable email sending for your Amazon SES account using <a>UpdateAccountSendingEnabled</a>.</p>
 * @public
 */
export declare class AccountSendingPausedException extends __BaseException {
    readonly name: "AccountSendingPausedException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<AccountSendingPausedException, __BaseException>);
}
/**
 * <p>Indicates that a resource could not be created because of a naming conflict.</p>
 * @public
 */
export declare class AlreadyExistsException extends __BaseException {
    readonly name: "AlreadyExistsException";
    readonly $fault: "client";
    /**
     * <p>Indicates that a resource could not be created because the resource name already
     *             exists.</p>
     * @public
     */
    Name?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<AlreadyExistsException, __BaseException>);
}
/**
 * <p>Indicates that the delete operation could not be completed.</p>
 * @public
 */
export declare class CannotDeleteException extends __BaseException {
    readonly name: "CannotDeleteException";
    readonly $fault: "client";
    /**
     * <p>Indicates that a resource could not be deleted because no resource with the specified
     *             name exists.</p>
     * @public
     */
    Name?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<CannotDeleteException, __BaseException>);
}
/**
 * <p>Indicates that a resource could not be created because of service limits. For a list
 *             of Amazon SES limits, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/limits.html">Amazon SES Developer
 *             Guide</a>.</p>
 * @public
 */
export declare class LimitExceededException extends __BaseException {
    readonly name: "LimitExceededException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<LimitExceededException, __BaseException>);
}
/**
 * <p>Indicates that the provided receipt rule set does not exist.</p>
 * @public
 */
export declare class RuleSetDoesNotExistException extends __BaseException {
    readonly name: "RuleSetDoesNotExistException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the named receipt rule set does not exist.</p>
     * @public
     */
    Name?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<RuleSetDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that the configuration set could not be created because of a naming
 *             conflict.</p>
 * @public
 */
export declare class ConfigurationSetAlreadyExistsException extends __BaseException {
    readonly name: "ConfigurationSetAlreadyExistsException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ConfigurationSetAlreadyExistsException, __BaseException>);
}
/**
 * <p>Indicates that the configuration set does not exist.</p>
 * @public
 */
export declare class ConfigurationSetDoesNotExistException extends __BaseException {
    readonly name: "ConfigurationSetDoesNotExistException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ConfigurationSetDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that email sending is disabled for the configuration set.</p>
 *          <p>You can enable or disable email sending for a configuration set using <a>UpdateConfigurationSetSendingEnabled</a>.</p>
 * @public
 */
export declare class ConfigurationSetSendingPausedException extends __BaseException {
    readonly name: "ConfigurationSetSendingPausedException";
    readonly $fault: "client";
    /**
     * <p>The name of the configuration set for which email sending is disabled.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ConfigurationSetSendingPausedException, __BaseException>);
}
/**
 * <p>Indicates that the configuration set is invalid. See the error message for
 *             details.</p>
 * @public
 */
export declare class InvalidConfigurationSetException extends __BaseException {
    readonly name: "InvalidConfigurationSetException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidConfigurationSetException, __BaseException>);
}
/**
 * <p>Indicates that the event destination could not be created because of a naming
 *             conflict.</p>
 * @public
 */
export declare class EventDestinationAlreadyExistsException extends __BaseException {
    readonly name: "EventDestinationAlreadyExistsException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * <p>Indicates that the event destination does not exist.</p>
     * @public
     */
    EventDestinationName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<EventDestinationAlreadyExistsException, __BaseException>);
}
/**
 * <p>Indicates that the Amazon CloudWatch destination is invalid. See the error message for
 *             details.</p>
 * @public
 */
export declare class InvalidCloudWatchDestinationException extends __BaseException {
    readonly name: "InvalidCloudWatchDestinationException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * <p>Indicates that the event destination does not exist.</p>
     * @public
     */
    EventDestinationName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidCloudWatchDestinationException, __BaseException>);
}
/**
 * <p>Indicates that the Amazon Kinesis Firehose destination is invalid. See the error
 *             message for details.</p>
 * @public
 */
export declare class InvalidFirehoseDestinationException extends __BaseException {
    readonly name: "InvalidFirehoseDestinationException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * <p>Indicates that the event destination does not exist.</p>
     * @public
     */
    EventDestinationName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidFirehoseDestinationException, __BaseException>);
}
/**
 * <p>Indicates that the Amazon Simple Notification Service (Amazon SNS) destination is
 *             invalid. See the error message for details.</p>
 * @public
 */
export declare class InvalidSNSDestinationException extends __BaseException {
    readonly name: "InvalidSNSDestinationException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * <p>Indicates that the event destination does not exist.</p>
     * @public
     */
    EventDestinationName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidSNSDestinationException, __BaseException>);
}
/**
 * <p>Indicates that the custom domain to be used for open and click tracking redirects is
 *             invalid. This error appears most often in the following situations:</p>
 *          <ul>
 *             <li>
 *                <p>When the tracking domain you specified is not verified in Amazon SES.</p>
 *             </li>
 *             <li>
 *                <p>When the tracking domain you specified is not a valid domain or
 *                     subdomain.</p>
 *             </li>
 *          </ul>
 * @public
 */
export declare class InvalidTrackingOptionsException extends __BaseException {
    readonly name: "InvalidTrackingOptionsException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidTrackingOptionsException, __BaseException>);
}
/**
 * <p>Indicates that the configuration set you specified already contains a TrackingOptions
 *             object.</p>
 * @public
 */
export declare class TrackingOptionsAlreadyExistsException extends __BaseException {
    readonly name: "TrackingOptionsAlreadyExistsException";
    readonly $fault: "client";
    /**
     * <p>Indicates that a TrackingOptions object already exists in the specified configuration
     *             set.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<TrackingOptionsAlreadyExistsException, __BaseException>);
}
/**
 * <p>Indicates that custom verification email template provided content is invalid.</p>
 * @public
 */
export declare class CustomVerificationEmailInvalidContentException extends __BaseException {
    readonly name: "CustomVerificationEmailInvalidContentException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<CustomVerificationEmailInvalidContentException, __BaseException>);
}
/**
 * <p>Indicates that a custom verification email template with the name you specified
 *             already exists.</p>
 * @public
 */
export declare class CustomVerificationEmailTemplateAlreadyExistsException extends __BaseException {
    readonly name: "CustomVerificationEmailTemplateAlreadyExistsException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the provided custom verification email template with the specified
     *             template name already exists.</p>
     * @public
     */
    CustomVerificationEmailTemplateName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<CustomVerificationEmailTemplateAlreadyExistsException, __BaseException>);
}
/**
 * <p>Indicates that the sender address specified for a custom verification email is not
 *             verified, and is therefore not eligible to send the custom verification email. </p>
 * @public
 */
export declare class FromEmailAddressNotVerifiedException extends __BaseException {
    readonly name: "FromEmailAddressNotVerifiedException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the from email address associated with the custom verification email
     *             template is not verified.</p>
     * @public
     */
    FromEmailAddress?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<FromEmailAddressNotVerifiedException, __BaseException>);
}
/**
 * <p>Indicates that the provided Amazon Web Services Lambda function is invalid, or that Amazon SES could
 *             not execute the provided function, possibly due to permissions issues. For information
 *             about giving permissions, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-permissions.html">Amazon SES
 *                 Developer Guide</a>.</p>
 * @public
 */
export declare class InvalidLambdaFunctionException extends __BaseException {
    readonly name: "InvalidLambdaFunctionException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the ARN of the function was not found.</p>
     * @public
     */
    FunctionArn?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidLambdaFunctionException, __BaseException>);
}
/**
 * <p>Indicates that the provided Amazon S3 bucket or Amazon Web Services KMS encryption key is invalid,
 *             or that Amazon SES could not publish to the bucket, possibly due to permissions issues.
 *             For information about giving permissions, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-permissions.html">Amazon SES
 *                 Developer Guide</a>.</p>
 * @public
 */
export declare class InvalidS3ConfigurationException extends __BaseException {
    readonly name: "InvalidS3ConfigurationException";
    readonly $fault: "client";
    /**
     * <p>Indicated that the S3 Bucket was not found.</p>
     * @public
     */
    Bucket?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidS3ConfigurationException, __BaseException>);
}
/**
 * <p>Indicates that the provided Amazon SNS topic is invalid, or that Amazon SES could not
 *             publish to the topic, possibly due to permissions issues. For information about giving
 *             permissions, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-permissions.html">Amazon SES
 *                 Developer Guide</a>.</p>
 * @public
 */
export declare class InvalidSnsTopicException extends __BaseException {
    readonly name: "InvalidSnsTopicException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the topic does not exist.</p>
     * @public
     */
    Topic?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidSnsTopicException, __BaseException>);
}
/**
 * <p>Indicates that the provided receipt rule does not exist.</p>
 * @public
 */
export declare class RuleDoesNotExistException extends __BaseException {
    readonly name: "RuleDoesNotExistException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the named receipt rule does not exist.</p>
     * @public
     */
    Name?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<RuleDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that the template that you specified could not be rendered. This issue may
 *             occur when a template refers to a partial that does not exist.</p>
 * @public
 */
export declare class InvalidTemplateException extends __BaseException {
    readonly name: "InvalidTemplateException";
    readonly $fault: "client";
    TemplateName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidTemplateException, __BaseException>);
}
/**
 * <p>Indicates that a custom verification email template with the name you specified does
 *             not exist.</p>
 * @public
 */
export declare class CustomVerificationEmailTemplateDoesNotExistException extends __BaseException {
    readonly name: "CustomVerificationEmailTemplateDoesNotExistException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the provided custom verification email template does not exist.</p>
     * @public
     */
    CustomVerificationEmailTemplateName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<CustomVerificationEmailTemplateDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that the event destination does not exist.</p>
 * @public
 */
export declare class EventDestinationDoesNotExistException extends __BaseException {
    readonly name: "EventDestinationDoesNotExistException";
    readonly $fault: "client";
    /**
     * <p>Indicates that the configuration set does not exist.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * <p>Indicates that the event destination does not exist.</p>
     * @public
     */
    EventDestinationName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<EventDestinationDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that the TrackingOptions object you specified does not exist.</p>
 * @public
 */
export declare class TrackingOptionsDoesNotExistException extends __BaseException {
    readonly name: "TrackingOptionsDoesNotExistException";
    readonly $fault: "client";
    /**
     * <p>Indicates that a TrackingOptions object does not exist in the specified configuration
     *             set.</p>
     * @public
     */
    ConfigurationSetName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<TrackingOptionsDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that the Template object you specified does not exist in your Amazon SES
 *             account.</p>
 * @public
 */
export declare class TemplateDoesNotExistException extends __BaseException {
    readonly name: "TemplateDoesNotExistException";
    readonly $fault: "client";
    TemplateName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<TemplateDoesNotExistException, __BaseException>);
}
/**
 * <p>Indicates that provided delivery option is invalid.</p>
 * @public
 */
export declare class InvalidDeliveryOptionsException extends __BaseException {
    readonly name: "InvalidDeliveryOptionsException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidDeliveryOptionsException, __BaseException>);
}
/**
 * <p>Indicates that the provided policy is invalid. Check the error stack for more
 *             information about what caused the error.</p>
 * @public
 */
export declare class InvalidPolicyException extends __BaseException {
    readonly name: "InvalidPolicyException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidPolicyException, __BaseException>);
}
/**
 * <p>Indicates that one or more of the replacement values you provided is invalid. This
 *             error may occur when the TemplateData object contains invalid JSON.</p>
 * @public
 */
export declare class InvalidRenderingParameterException extends __BaseException {
    readonly name: "InvalidRenderingParameterException";
    readonly $fault: "client";
    TemplateName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InvalidRenderingParameterException, __BaseException>);
}
/**
 * <p> Indicates that the message could not be sent because Amazon SES could not read the MX
 *             record required to use the specified MAIL FROM domain. For information about editing the
 *             custom MAIL FROM domain settings for an identity, see the <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/mail-from-edit.html">Amazon SES Developer
 *                 Guide</a>.</p>
 * @public
 */
export declare class MailFromDomainNotVerifiedException extends __BaseException {
    readonly name: "MailFromDomainNotVerifiedException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<MailFromDomainNotVerifiedException, __BaseException>);
}
/**
 * <p>Indicates that the action failed, and the message could not be sent. Check the error
 *             stack for more information about what caused the error.</p>
 * @public
 */
export declare class MessageRejected extends __BaseException {
    readonly name: "MessageRejected";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<MessageRejected, __BaseException>);
}
/**
 * <p>Indicates that one or more of the replacement values for the specified template was
 *             not specified. Ensure that the TemplateData object contains references to all of the
 *             replacement tags in the specified template.</p>
 * @public
 */
export declare class MissingRenderingAttributeException extends __BaseException {
    readonly name: "MissingRenderingAttributeException";
    readonly $fault: "client";
    TemplateName?: string | undefined;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<MissingRenderingAttributeException, __BaseException>);
}
/**
 * <p>Indicates that the account has not been granted production access.</p>
 * @public
 */
export declare class ProductionAccessNotGrantedException extends __BaseException {
    readonly name: "ProductionAccessNotGrantedException";
    readonly $fault: "client";
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ProductionAccessNotGrantedException, __BaseException>);
}
