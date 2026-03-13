import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateReceiptRuleSet$ } from "../schemas/schemas_0";
export { $Command };
export class CreateReceiptRuleSetCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "CreateReceiptRuleSet", {})
    .n("SESClient", "CreateReceiptRuleSetCommand")
    .sc(CreateReceiptRuleSet$)
    .build() {
}
