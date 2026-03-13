import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateAccountSendingEnabled$ } from "../schemas/schemas_0";
export { $Command };
export class UpdateAccountSendingEnabledCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "UpdateAccountSendingEnabled", {})
    .n("SESClient", "UpdateAccountSendingEnabledCommand")
    .sc(UpdateAccountSendingEnabled$)
    .build() {
}
