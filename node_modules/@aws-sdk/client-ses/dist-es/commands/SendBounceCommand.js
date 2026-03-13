import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SendBounce$ } from "../schemas/schemas_0";
export { $Command };
export class SendBounceCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SendBounce", {})
    .n("SESClient", "SendBounceCommand")
    .sc(SendBounce$)
    .build() {
}
