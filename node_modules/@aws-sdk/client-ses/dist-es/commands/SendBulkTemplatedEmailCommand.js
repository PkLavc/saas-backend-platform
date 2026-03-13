import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SendBulkTemplatedEmail$ } from "../schemas/schemas_0";
export { $Command };
export class SendBulkTemplatedEmailCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SendBulkTemplatedEmail", {})
    .n("SESClient", "SendBulkTemplatedEmailCommand")
    .sc(SendBulkTemplatedEmail$)
    .build() {
}
