import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteIdentity$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteIdentityCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DeleteIdentity", {})
    .n("SESClient", "DeleteIdentityCommand")
    .sc(DeleteIdentity$)
    .build() {
}
