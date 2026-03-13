import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SetIdentityFeedbackForwardingEnabled$ } from "../schemas/schemas_0";
export { $Command };
export class SetIdentityFeedbackForwardingEnabledCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SetIdentityFeedbackForwardingEnabled", {})
    .n("SESClient", "SetIdentityFeedbackForwardingEnabledCommand")
    .sc(SetIdentityFeedbackForwardingEnabled$)
    .build() {
}
