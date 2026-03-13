import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteIdentityPolicy$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteIdentityPolicyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DeleteIdentityPolicy", {})
    .n("SESClient", "DeleteIdentityPolicyCommand")
    .sc(DeleteIdentityPolicy$)
    .build() {
}
