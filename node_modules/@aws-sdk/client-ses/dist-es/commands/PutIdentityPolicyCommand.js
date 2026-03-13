import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { PutIdentityPolicy$ } from "../schemas/schemas_0";
export { $Command };
export class PutIdentityPolicyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "PutIdentityPolicy", {})
    .n("SESClient", "PutIdentityPolicyCommand")
    .sc(PutIdentityPolicy$)
    .build() {
}
