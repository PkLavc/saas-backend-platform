import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { VerifyDomainDkim$ } from "../schemas/schemas_0";
export { $Command };
export class VerifyDomainDkimCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "VerifyDomainDkim", {})
    .n("SESClient", "VerifyDomainDkimCommand")
    .sc(VerifyDomainDkim$)
    .build() {
}
