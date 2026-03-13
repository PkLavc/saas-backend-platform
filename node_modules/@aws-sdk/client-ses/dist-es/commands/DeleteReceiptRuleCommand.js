import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteReceiptRule$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteReceiptRuleCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DeleteReceiptRule", {})
    .n("SESClient", "DeleteReceiptRuleCommand")
    .sc(DeleteReceiptRule$)
    .build() {
}
