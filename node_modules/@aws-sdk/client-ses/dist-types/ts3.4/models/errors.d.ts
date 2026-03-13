import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";
import { SESServiceException as __BaseException } from "./SESServiceException";
export declare class AccountSendingPausedException extends __BaseException {
  readonly name: "AccountSendingPausedException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<AccountSendingPausedException, __BaseException>
  );
}
export declare class AlreadyExistsException extends __BaseException {
  readonly name: "AlreadyExistsException";
  readonly $fault: "client";
  Name?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<AlreadyExistsException, __BaseException>
  );
}
export declare class CannotDeleteException extends __BaseException {
  readonly name: "CannotDeleteException";
  readonly $fault: "client";
  Name?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<CannotDeleteException, __BaseException>
  );
}
export declare class LimitExceededException extends __BaseException {
  readonly name: "LimitExceededException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<LimitExceededException, __BaseException>
  );
}
export declare class RuleSetDoesNotExistException extends __BaseException {
  readonly name: "RuleSetDoesNotExistException";
  readonly $fault: "client";
  Name?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<RuleSetDoesNotExistException, __BaseException>
  );
}
export declare class ConfigurationSetAlreadyExistsException extends __BaseException {
  readonly name: "ConfigurationSetAlreadyExistsException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      ConfigurationSetAlreadyExistsException,
      __BaseException
    >
  );
}
export declare class ConfigurationSetDoesNotExistException extends __BaseException {
  readonly name: "ConfigurationSetDoesNotExistException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      ConfigurationSetDoesNotExistException,
      __BaseException
    >
  );
}
export declare class ConfigurationSetSendingPausedException extends __BaseException {
  readonly name: "ConfigurationSetSendingPausedException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      ConfigurationSetSendingPausedException,
      __BaseException
    >
  );
}
export declare class InvalidConfigurationSetException extends __BaseException {
  readonly name: "InvalidConfigurationSetException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      InvalidConfigurationSetException,
      __BaseException
    >
  );
}
export declare class EventDestinationAlreadyExistsException extends __BaseException {
  readonly name: "EventDestinationAlreadyExistsException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  EventDestinationName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      EventDestinationAlreadyExistsException,
      __BaseException
    >
  );
}
export declare class InvalidCloudWatchDestinationException extends __BaseException {
  readonly name: "InvalidCloudWatchDestinationException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  EventDestinationName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      InvalidCloudWatchDestinationException,
      __BaseException
    >
  );
}
export declare class InvalidFirehoseDestinationException extends __BaseException {
  readonly name: "InvalidFirehoseDestinationException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  EventDestinationName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      InvalidFirehoseDestinationException,
      __BaseException
    >
  );
}
export declare class InvalidSNSDestinationException extends __BaseException {
  readonly name: "InvalidSNSDestinationException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  EventDestinationName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InvalidSNSDestinationException, __BaseException>
  );
}
export declare class InvalidTrackingOptionsException extends __BaseException {
  readonly name: "InvalidTrackingOptionsException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      InvalidTrackingOptionsException,
      __BaseException
    >
  );
}
export declare class TrackingOptionsAlreadyExistsException extends __BaseException {
  readonly name: "TrackingOptionsAlreadyExistsException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      TrackingOptionsAlreadyExistsException,
      __BaseException
    >
  );
}
export declare class CustomVerificationEmailInvalidContentException extends __BaseException {
  readonly name: "CustomVerificationEmailInvalidContentException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      CustomVerificationEmailInvalidContentException,
      __BaseException
    >
  );
}
export declare class CustomVerificationEmailTemplateAlreadyExistsException extends __BaseException {
  readonly name: "CustomVerificationEmailTemplateAlreadyExistsException";
  readonly $fault: "client";
  CustomVerificationEmailTemplateName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      CustomVerificationEmailTemplateAlreadyExistsException,
      __BaseException
    >
  );
}
export declare class FromEmailAddressNotVerifiedException extends __BaseException {
  readonly name: "FromEmailAddressNotVerifiedException";
  readonly $fault: "client";
  FromEmailAddress?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      FromEmailAddressNotVerifiedException,
      __BaseException
    >
  );
}
export declare class InvalidLambdaFunctionException extends __BaseException {
  readonly name: "InvalidLambdaFunctionException";
  readonly $fault: "client";
  FunctionArn?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InvalidLambdaFunctionException, __BaseException>
  );
}
export declare class InvalidS3ConfigurationException extends __BaseException {
  readonly name: "InvalidS3ConfigurationException";
  readonly $fault: "client";
  Bucket?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      InvalidS3ConfigurationException,
      __BaseException
    >
  );
}
export declare class InvalidSnsTopicException extends __BaseException {
  readonly name: "InvalidSnsTopicException";
  readonly $fault: "client";
  Topic?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InvalidSnsTopicException, __BaseException>
  );
}
export declare class RuleDoesNotExistException extends __BaseException {
  readonly name: "RuleDoesNotExistException";
  readonly $fault: "client";
  Name?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<RuleDoesNotExistException, __BaseException>
  );
}
export declare class InvalidTemplateException extends __BaseException {
  readonly name: "InvalidTemplateException";
  readonly $fault: "client";
  TemplateName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<InvalidTemplateException, __BaseException>
  );
}
export declare class CustomVerificationEmailTemplateDoesNotExistException extends __BaseException {
  readonly name: "CustomVerificationEmailTemplateDoesNotExistException";
  readonly $fault: "client";
  CustomVerificationEmailTemplateName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      CustomVerificationEmailTemplateDoesNotExistException,
      __BaseException
    >
  );
}
export declare class EventDestinationDoesNotExistException extends __BaseException {
  readonly name: "EventDestinationDoesNotExistException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  EventDestinationName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      EventDestinationDoesNotExistException,
      __BaseException
    >
  );
}
export declare class TrackingOptionsDoesNotExistException extends __BaseException {
  readonly name: "TrackingOptionsDoesNotExistException";
  readonly $fault: "client";
  ConfigurationSetName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      TrackingOptionsDoesNotExistException,
      __BaseException
    >
  );
}
export declare class TemplateDoesNotExistException extends __BaseException {
  readonly name: "TemplateDoesNotExistException";
  readonly $fault: "client";
  TemplateName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<TemplateDoesNotExistException, __BaseException>
  );
}
export declare class InvalidDeliveryOptionsException extends __BaseException {
  readonly name: "InvalidDeliveryOptionsException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      InvalidDeliveryOptionsException,
      __BaseException
    >
  );
}
export declare class InvalidPolicyException extends __BaseException {
  readonly name: "InvalidPolicyException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<InvalidPolicyException, __BaseException>
  );
}
export declare class InvalidRenderingParameterException extends __BaseException {
  readonly name: "InvalidRenderingParameterException";
  readonly $fault: "client";
  TemplateName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      InvalidRenderingParameterException,
      __BaseException
    >
  );
}
export declare class MailFromDomainNotVerifiedException extends __BaseException {
  readonly name: "MailFromDomainNotVerifiedException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      MailFromDomainNotVerifiedException,
      __BaseException
    >
  );
}
export declare class MessageRejected extends __BaseException {
  readonly name: "MessageRejected";
  readonly $fault: "client";
  constructor(opts: __ExceptionOptionType<MessageRejected, __BaseException>);
}
export declare class MissingRenderingAttributeException extends __BaseException {
  readonly name: "MissingRenderingAttributeException";
  readonly $fault: "client";
  TemplateName?: string | undefined;
  constructor(
    opts: __ExceptionOptionType<
      MissingRenderingAttributeException,
      __BaseException
    >
  );
}
export declare class ProductionAccessNotGrantedException extends __BaseException {
  readonly name: "ProductionAccessNotGrantedException";
  readonly $fault: "client";
  constructor(
    opts: __ExceptionOptionType<
      ProductionAccessNotGrantedException,
      __BaseException
    >
  );
}
