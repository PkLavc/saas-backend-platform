import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SetIdentityMailFromDomain$ } from "../schemas/schemas_0";
export { $Command };
export class SetIdentityMailFromDomainCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SetIdentityMailFromDomain", {})
    .n("SESClient", "SetIdentityMailFromDomainCommand")
    .sc(SetIdentityMailFromDomain$)
    .build() {
}
