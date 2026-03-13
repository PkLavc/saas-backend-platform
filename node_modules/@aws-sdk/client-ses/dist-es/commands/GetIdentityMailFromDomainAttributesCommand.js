import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetIdentityMailFromDomainAttributes$ } from "../schemas/schemas_0";
export { $Command };
export class GetIdentityMailFromDomainAttributesCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "GetIdentityMailFromDomainAttributes", {})
    .n("SESClient", "GetIdentityMailFromDomainAttributesCommand")
    .sc(GetIdentityMailFromDomainAttributes$)
    .build() {
}
