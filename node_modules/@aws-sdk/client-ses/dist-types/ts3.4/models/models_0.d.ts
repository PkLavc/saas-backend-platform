import {
  BehaviorOnMXFailure,
  BounceType,
  BulkEmailStatus,
  ConfigurationSetAttribute,
  CustomMailFromStatus,
  DimensionValueSource,
  DsnAction,
  EventType,
  IdentityType,
  InvocationType,
  NotificationType,
  ReceiptFilterPolicy,
  SNSActionEncoding,
  StopScope,
  TlsPolicy,
  VerificationStatus,
} from "./enums";
export interface AddHeaderAction {
  HeaderName: string | undefined;
  HeaderValue: string | undefined;
}
export interface Content {
  Data: string | undefined;
  Charset?: string | undefined;
}
export interface Body {
  Text?: Content | undefined;
  Html?: Content | undefined;
}
export interface BounceAction {
  TopicArn?: string | undefined;
  SmtpReplyCode: string | undefined;
  StatusCode?: string | undefined;
  Message: string | undefined;
  Sender: string | undefined;
}
export interface ExtensionField {
  Name: string | undefined;
  Value: string | undefined;
}
export interface RecipientDsnFields {
  FinalRecipient?: string | undefined;
  Action: DsnAction | undefined;
  RemoteMta?: string | undefined;
  Status: string | undefined;
  DiagnosticCode?: string | undefined;
  LastAttemptDate?: Date | undefined;
  ExtensionFields?: ExtensionField[] | undefined;
}
export interface BouncedRecipientInfo {
  Recipient: string | undefined;
  RecipientArn?: string | undefined;
  BounceType?: BounceType | undefined;
  RecipientDsnFields?: RecipientDsnFields | undefined;
}
export interface Destination {
  ToAddresses?: string[] | undefined;
  CcAddresses?: string[] | undefined;
  BccAddresses?: string[] | undefined;
}
export interface MessageTag {
  Name: string | undefined;
  Value: string | undefined;
}
export interface BulkEmailDestination {
  Destination: Destination | undefined;
  ReplacementTags?: MessageTag[] | undefined;
  ReplacementTemplateData?: string | undefined;
}
export interface BulkEmailDestinationStatus {
  Status?: BulkEmailStatus | undefined;
  Error?: string | undefined;
  MessageId?: string | undefined;
}
export interface CloneReceiptRuleSetRequest {
  RuleSetName: string | undefined;
  OriginalRuleSetName: string | undefined;
}
export interface CloneReceiptRuleSetResponse {}
export interface CloudWatchDimensionConfiguration {
  DimensionName: string | undefined;
  DimensionValueSource: DimensionValueSource | undefined;
  DefaultDimensionValue: string | undefined;
}
export interface CloudWatchDestination {
  DimensionConfigurations: CloudWatchDimensionConfiguration[] | undefined;
}
export interface ConfigurationSet {
  Name: string | undefined;
}
export interface ConnectAction {
  InstanceARN: string | undefined;
  IAMRoleARN: string | undefined;
}
export interface CreateConfigurationSetRequest {
  ConfigurationSet: ConfigurationSet | undefined;
}
export interface CreateConfigurationSetResponse {}
export interface KinesisFirehoseDestination {
  IAMRoleARN: string | undefined;
  DeliveryStreamARN: string | undefined;
}
export interface SNSDestination {
  TopicARN: string | undefined;
}
export interface EventDestination {
  Name: string | undefined;
  Enabled?: boolean | undefined;
  MatchingEventTypes: EventType[] | undefined;
  KinesisFirehoseDestination?: KinesisFirehoseDestination | undefined;
  CloudWatchDestination?: CloudWatchDestination | undefined;
  SNSDestination?: SNSDestination | undefined;
}
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string | undefined;
  EventDestination: EventDestination | undefined;
}
export interface CreateConfigurationSetEventDestinationResponse {}
export interface TrackingOptions {
  CustomRedirectDomain?: string | undefined;
}
export interface CreateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string | undefined;
  TrackingOptions: TrackingOptions | undefined;
}
export interface CreateConfigurationSetTrackingOptionsResponse {}
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string | undefined;
  FromEmailAddress: string | undefined;
  TemplateSubject: string | undefined;
  TemplateContent: string | undefined;
  SuccessRedirectionURL: string | undefined;
  FailureRedirectionURL: string | undefined;
}
export interface ReceiptIpFilter {
  Policy: ReceiptFilterPolicy | undefined;
  Cidr: string | undefined;
}
export interface ReceiptFilter {
  Name: string | undefined;
  IpFilter: ReceiptIpFilter | undefined;
}
export interface CreateReceiptFilterRequest {
  Filter: ReceiptFilter | undefined;
}
export interface CreateReceiptFilterResponse {}
export interface LambdaAction {
  TopicArn?: string | undefined;
  FunctionArn: string | undefined;
  InvocationType?: InvocationType | undefined;
}
export interface S3Action {
  TopicArn?: string | undefined;
  BucketName: string | undefined;
  ObjectKeyPrefix?: string | undefined;
  KmsKeyArn?: string | undefined;
  IamRoleArn?: string | undefined;
}
export interface SNSAction {
  TopicArn: string | undefined;
  Encoding?: SNSActionEncoding | undefined;
}
export interface StopAction {
  Scope: StopScope | undefined;
  TopicArn?: string | undefined;
}
export interface WorkmailAction {
  TopicArn?: string | undefined;
  OrganizationArn: string | undefined;
}
export interface ReceiptAction {
  S3Action?: S3Action | undefined;
  BounceAction?: BounceAction | undefined;
  WorkmailAction?: WorkmailAction | undefined;
  LambdaAction?: LambdaAction | undefined;
  StopAction?: StopAction | undefined;
  AddHeaderAction?: AddHeaderAction | undefined;
  SNSAction?: SNSAction | undefined;
  ConnectAction?: ConnectAction | undefined;
}
export interface ReceiptRule {
  Name: string | undefined;
  Enabled?: boolean | undefined;
  TlsPolicy?: TlsPolicy | undefined;
  Recipients?: string[] | undefined;
  Actions?: ReceiptAction[] | undefined;
  ScanEnabled?: boolean | undefined;
}
export interface CreateReceiptRuleRequest {
  RuleSetName: string | undefined;
  After?: string | undefined;
  Rule: ReceiptRule | undefined;
}
export interface CreateReceiptRuleResponse {}
export interface CreateReceiptRuleSetRequest {
  RuleSetName: string | undefined;
}
export interface CreateReceiptRuleSetResponse {}
export interface Template {
  TemplateName: string | undefined;
  SubjectPart?: string | undefined;
  TextPart?: string | undefined;
  HtmlPart?: string | undefined;
}
export interface CreateTemplateRequest {
  Template: Template | undefined;
}
export interface CreateTemplateResponse {}
export interface CustomVerificationEmailTemplate {
  TemplateName?: string | undefined;
  FromEmailAddress?: string | undefined;
  TemplateSubject?: string | undefined;
  SuccessRedirectionURL?: string | undefined;
  FailureRedirectionURL?: string | undefined;
}
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string | undefined;
}
export interface DeleteConfigurationSetResponse {}
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string | undefined;
  EventDestinationName: string | undefined;
}
export interface DeleteConfigurationSetEventDestinationResponse {}
export interface DeleteConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string | undefined;
}
export interface DeleteConfigurationSetTrackingOptionsResponse {}
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string | undefined;
}
export interface DeleteIdentityRequest {
  Identity: string | undefined;
}
export interface DeleteIdentityResponse {}
export interface DeleteIdentityPolicyRequest {
  Identity: string | undefined;
  PolicyName: string | undefined;
}
export interface DeleteIdentityPolicyResponse {}
export interface DeleteReceiptFilterRequest {
  FilterName: string | undefined;
}
export interface DeleteReceiptFilterResponse {}
export interface DeleteReceiptRuleRequest {
  RuleSetName: string | undefined;
  RuleName: string | undefined;
}
export interface DeleteReceiptRuleResponse {}
export interface DeleteReceiptRuleSetRequest {
  RuleSetName: string | undefined;
}
export interface DeleteReceiptRuleSetResponse {}
export interface DeleteTemplateRequest {
  TemplateName: string | undefined;
}
export interface DeleteTemplateResponse {}
export interface DeleteVerifiedEmailAddressRequest {
  EmailAddress: string | undefined;
}
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy | undefined;
}
export interface DescribeActiveReceiptRuleSetRequest {}
export interface ReceiptRuleSetMetadata {
  Name?: string | undefined;
  CreatedTimestamp?: Date | undefined;
}
export interface DescribeActiveReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata | undefined;
  Rules?: ReceiptRule[] | undefined;
}
export interface DescribeConfigurationSetRequest {
  ConfigurationSetName: string | undefined;
  ConfigurationSetAttributeNames?: ConfigurationSetAttribute[] | undefined;
}
export interface ReputationOptions {
  SendingEnabled?: boolean | undefined;
  ReputationMetricsEnabled?: boolean | undefined;
  LastFreshStart?: Date | undefined;
}
export interface DescribeConfigurationSetResponse {
  ConfigurationSet?: ConfigurationSet | undefined;
  EventDestinations?: EventDestination[] | undefined;
  TrackingOptions?: TrackingOptions | undefined;
  DeliveryOptions?: DeliveryOptions | undefined;
  ReputationOptions?: ReputationOptions | undefined;
}
export interface DescribeReceiptRuleRequest {
  RuleSetName: string | undefined;
  RuleName: string | undefined;
}
export interface DescribeReceiptRuleResponse {
  Rule?: ReceiptRule | undefined;
}
export interface DescribeReceiptRuleSetRequest {
  RuleSetName: string | undefined;
}
export interface DescribeReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata | undefined;
  Rules?: ReceiptRule[] | undefined;
}
export interface IdentityDkimAttributes {
  DkimEnabled: boolean | undefined;
  DkimVerificationStatus: VerificationStatus | undefined;
  DkimTokens?: string[] | undefined;
}
export interface GetAccountSendingEnabledResponse {
  Enabled?: boolean | undefined;
}
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string | undefined;
}
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string | undefined;
  FromEmailAddress?: string | undefined;
  TemplateSubject?: string | undefined;
  TemplateContent?: string | undefined;
  SuccessRedirectionURL?: string | undefined;
  FailureRedirectionURL?: string | undefined;
}
export interface GetIdentityDkimAttributesRequest {
  Identities: string[] | undefined;
}
export interface GetIdentityDkimAttributesResponse {
  DkimAttributes: Record<string, IdentityDkimAttributes> | undefined;
}
export interface GetIdentityMailFromDomainAttributesRequest {
  Identities: string[] | undefined;
}
export interface IdentityMailFromDomainAttributes {
  MailFromDomain: string | undefined;
  MailFromDomainStatus: CustomMailFromStatus | undefined;
  BehaviorOnMXFailure: BehaviorOnMXFailure | undefined;
}
export interface GetIdentityMailFromDomainAttributesResponse {
  MailFromDomainAttributes:
    | Record<string, IdentityMailFromDomainAttributes>
    | undefined;
}
export interface GetIdentityNotificationAttributesRequest {
  Identities: string[] | undefined;
}
export interface IdentityNotificationAttributes {
  BounceTopic: string | undefined;
  ComplaintTopic: string | undefined;
  DeliveryTopic: string | undefined;
  ForwardingEnabled: boolean | undefined;
  HeadersInBounceNotificationsEnabled?: boolean | undefined;
  HeadersInComplaintNotificationsEnabled?: boolean | undefined;
  HeadersInDeliveryNotificationsEnabled?: boolean | undefined;
}
export interface GetIdentityNotificationAttributesResponse {
  NotificationAttributes:
    | Record<string, IdentityNotificationAttributes>
    | undefined;
}
export interface GetIdentityPoliciesRequest {
  Identity: string | undefined;
  PolicyNames: string[] | undefined;
}
export interface GetIdentityPoliciesResponse {
  Policies: Record<string, string> | undefined;
}
export interface GetIdentityVerificationAttributesRequest {
  Identities: string[] | undefined;
}
export interface IdentityVerificationAttributes {
  VerificationStatus: VerificationStatus | undefined;
  VerificationToken?: string | undefined;
}
export interface GetIdentityVerificationAttributesResponse {
  VerificationAttributes:
    | Record<string, IdentityVerificationAttributes>
    | undefined;
}
export interface GetSendQuotaResponse {
  Max24HourSend?: number | undefined;
  MaxSendRate?: number | undefined;
  SentLast24Hours?: number | undefined;
}
export interface SendDataPoint {
  Timestamp?: Date | undefined;
  DeliveryAttempts?: number | undefined;
  Bounces?: number | undefined;
  Complaints?: number | undefined;
  Rejects?: number | undefined;
}
export interface GetSendStatisticsResponse {
  SendDataPoints?: SendDataPoint[] | undefined;
}
export interface GetTemplateRequest {
  TemplateName: string | undefined;
}
export interface GetTemplateResponse {
  Template?: Template | undefined;
}
export interface ListConfigurationSetsRequest {
  NextToken?: string | undefined;
  MaxItems?: number | undefined;
}
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: ConfigurationSet[] | undefined;
  NextToken?: string | undefined;
}
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?:
    | CustomVerificationEmailTemplate[]
    | undefined;
  NextToken?: string | undefined;
}
export interface ListIdentitiesRequest {
  IdentityType?: IdentityType | undefined;
  NextToken?: string | undefined;
  MaxItems?: number | undefined;
}
export interface ListIdentitiesResponse {
  Identities: string[] | undefined;
  NextToken?: string | undefined;
}
export interface ListIdentityPoliciesRequest {
  Identity: string | undefined;
}
export interface ListIdentityPoliciesResponse {
  PolicyNames: string[] | undefined;
}
export interface ListReceiptFiltersRequest {}
export interface ListReceiptFiltersResponse {
  Filters?: ReceiptFilter[] | undefined;
}
export interface ListReceiptRuleSetsRequest {
  NextToken?: string | undefined;
}
export interface ListReceiptRuleSetsResponse {
  RuleSets?: ReceiptRuleSetMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListTemplatesRequest {
  NextToken?: string | undefined;
  MaxItems?: number | undefined;
}
export interface TemplateMetadata {
  Name?: string | undefined;
  CreatedTimestamp?: Date | undefined;
}
export interface ListTemplatesResponse {
  TemplatesMetadata?: TemplateMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListVerifiedEmailAddressesResponse {
  VerifiedEmailAddresses?: string[] | undefined;
}
export interface Message {
  Subject: Content | undefined;
  Body: Body | undefined;
}
export interface MessageDsn {
  ReportingMta: string | undefined;
  ArrivalDate?: Date | undefined;
  ExtensionFields?: ExtensionField[] | undefined;
}
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string | undefined;
  DeliveryOptions?: DeliveryOptions | undefined;
}
export interface PutConfigurationSetDeliveryOptionsResponse {}
export interface PutIdentityPolicyRequest {
  Identity: string | undefined;
  PolicyName: string | undefined;
  Policy: string | undefined;
}
export interface PutIdentityPolicyResponse {}
export interface RawMessage {
  Data: Uint8Array | undefined;
}
export interface ReorderReceiptRuleSetRequest {
  RuleSetName: string | undefined;
  RuleNames: string[] | undefined;
}
export interface ReorderReceiptRuleSetResponse {}
export interface SendBounceRequest {
  OriginalMessageId: string | undefined;
  BounceSender: string | undefined;
  Explanation?: string | undefined;
  MessageDsn?: MessageDsn | undefined;
  BouncedRecipientInfoList: BouncedRecipientInfo[] | undefined;
  BounceSenderArn?: string | undefined;
}
export interface SendBounceResponse {
  MessageId?: string | undefined;
}
export interface SendBulkTemplatedEmailRequest {
  Source: string | undefined;
  SourceArn?: string | undefined;
  ReplyToAddresses?: string[] | undefined;
  ReturnPath?: string | undefined;
  ReturnPathArn?: string | undefined;
  ConfigurationSetName?: string | undefined;
  DefaultTags?: MessageTag[] | undefined;
  Template: string | undefined;
  TemplateArn?: string | undefined;
  DefaultTemplateData: string | undefined;
  Destinations: BulkEmailDestination[] | undefined;
}
export interface SendBulkTemplatedEmailResponse {
  Status: BulkEmailDestinationStatus[] | undefined;
}
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string | undefined;
  TemplateName: string | undefined;
  ConfigurationSetName?: string | undefined;
}
export interface SendCustomVerificationEmailResponse {
  MessageId?: string | undefined;
}
export interface SendEmailRequest {
  Source: string | undefined;
  Destination: Destination | undefined;
  Message: Message | undefined;
  ReplyToAddresses?: string[] | undefined;
  ReturnPath?: string | undefined;
  SourceArn?: string | undefined;
  ReturnPathArn?: string | undefined;
  Tags?: MessageTag[] | undefined;
  ConfigurationSetName?: string | undefined;
}
export interface SendEmailResponse {
  MessageId: string | undefined;
}
export interface SendRawEmailRequest {
  Source?: string | undefined;
  Destinations?: string[] | undefined;
  RawMessage: RawMessage | undefined;
  FromArn?: string | undefined;
  SourceArn?: string | undefined;
  ReturnPathArn?: string | undefined;
  Tags?: MessageTag[] | undefined;
  ConfigurationSetName?: string | undefined;
}
export interface SendRawEmailResponse {
  MessageId: string | undefined;
}
export interface SendTemplatedEmailRequest {
  Source: string | undefined;
  Destination: Destination | undefined;
  ReplyToAddresses?: string[] | undefined;
  ReturnPath?: string | undefined;
  SourceArn?: string | undefined;
  ReturnPathArn?: string | undefined;
  Tags?: MessageTag[] | undefined;
  ConfigurationSetName?: string | undefined;
  Template: string | undefined;
  TemplateArn?: string | undefined;
  TemplateData: string | undefined;
}
export interface SendTemplatedEmailResponse {
  MessageId: string | undefined;
}
export interface SetActiveReceiptRuleSetRequest {
  RuleSetName?: string | undefined;
}
export interface SetActiveReceiptRuleSetResponse {}
export interface SetIdentityDkimEnabledRequest {
  Identity: string | undefined;
  DkimEnabled: boolean | undefined;
}
export interface SetIdentityDkimEnabledResponse {}
export interface SetIdentityFeedbackForwardingEnabledRequest {
  Identity: string | undefined;
  ForwardingEnabled: boolean | undefined;
}
export interface SetIdentityFeedbackForwardingEnabledResponse {}
export interface SetIdentityHeadersInNotificationsEnabledRequest {
  Identity: string | undefined;
  NotificationType: NotificationType | undefined;
  Enabled: boolean | undefined;
}
export interface SetIdentityHeadersInNotificationsEnabledResponse {}
export interface SetIdentityMailFromDomainRequest {
  Identity: string | undefined;
  MailFromDomain?: string | undefined;
  BehaviorOnMXFailure?: BehaviorOnMXFailure | undefined;
}
export interface SetIdentityMailFromDomainResponse {}
export interface SetIdentityNotificationTopicRequest {
  Identity: string | undefined;
  NotificationType: NotificationType | undefined;
  SnsTopic?: string | undefined;
}
export interface SetIdentityNotificationTopicResponse {}
export interface SetReceiptRulePositionRequest {
  RuleSetName: string | undefined;
  RuleName: string | undefined;
  After?: string | undefined;
}
export interface SetReceiptRulePositionResponse {}
export interface TestRenderTemplateRequest {
  TemplateName: string | undefined;
  TemplateData: string | undefined;
}
export interface TestRenderTemplateResponse {
  RenderedTemplate?: string | undefined;
}
export interface UpdateAccountSendingEnabledRequest {
  Enabled?: boolean | undefined;
}
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string | undefined;
  EventDestination: EventDestination | undefined;
}
export interface UpdateConfigurationSetEventDestinationResponse {}
export interface UpdateConfigurationSetReputationMetricsEnabledRequest {
  ConfigurationSetName: string | undefined;
  Enabled: boolean | undefined;
}
export interface UpdateConfigurationSetSendingEnabledRequest {
  ConfigurationSetName: string | undefined;
  Enabled: boolean | undefined;
}
export interface UpdateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string | undefined;
  TrackingOptions: TrackingOptions | undefined;
}
export interface UpdateConfigurationSetTrackingOptionsResponse {}
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string | undefined;
  FromEmailAddress?: string | undefined;
  TemplateSubject?: string | undefined;
  TemplateContent?: string | undefined;
  SuccessRedirectionURL?: string | undefined;
  FailureRedirectionURL?: string | undefined;
}
export interface UpdateReceiptRuleRequest {
  RuleSetName: string | undefined;
  Rule: ReceiptRule | undefined;
}
export interface UpdateReceiptRuleResponse {}
export interface UpdateTemplateRequest {
  Template: Template | undefined;
}
export interface UpdateTemplateResponse {}
export interface VerifyDomainDkimRequest {
  Domain: string | undefined;
}
export interface VerifyDomainDkimResponse {
  DkimTokens: string[] | undefined;
}
export interface VerifyDomainIdentityRequest {
  Domain: string | undefined;
}
export interface VerifyDomainIdentityResponse {
  VerificationToken: string | undefined;
}
export interface VerifyEmailAddressRequest {
  EmailAddress: string | undefined;
}
export interface VerifyEmailIdentityRequest {
  EmailAddress: string | undefined;
}
export interface VerifyEmailIdentityResponse {}
