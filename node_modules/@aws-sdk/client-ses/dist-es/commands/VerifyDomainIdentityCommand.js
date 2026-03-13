import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { VerifyDomainIdentity$ } from "../schemas/schemas_0";
export { $Command };
export class VerifyDomainIdentityCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "VerifyDomainIdentity", {})
    .n("SESClient", "VerifyDomainIdentityCommand")
    .sc(VerifyDomainIdentity$)
    .build() {
}
