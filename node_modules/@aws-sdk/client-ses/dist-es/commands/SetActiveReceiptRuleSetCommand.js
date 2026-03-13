import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SetActiveReceiptRuleSet$ } from "../schemas/schemas_0";
export { $Command };
export class SetActiveReceiptRuleSetCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SetActiveReceiptRuleSet", {})
    .n("SESClient", "SetActiveReceiptRuleSetCommand")
    .sc(SetActiveReceiptRuleSet$)
    .build() {
}
