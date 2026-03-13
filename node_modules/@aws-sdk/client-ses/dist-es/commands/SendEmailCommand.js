import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SendEmail$ } from "../schemas/schemas_0";
export { $Command };
export class SendEmailCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SendEmail", {})
    .n("SESClient", "SendEmailCommand")
    .sc(SendEmail$)
    .build() {
}
