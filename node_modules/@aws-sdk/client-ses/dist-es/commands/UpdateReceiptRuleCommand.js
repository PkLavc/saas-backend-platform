import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateReceiptRule$ } from "../schemas/schemas_0";
export { $Command };
export class UpdateReceiptRuleCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "UpdateReceiptRule", {})
    .n("SESClient", "UpdateReceiptRuleCommand")
    .sc(UpdateReceiptRule$)
    .build() {
}
