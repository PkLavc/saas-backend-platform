import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DescribeActiveReceiptRuleSet$ } from "../schemas/schemas_0";
export { $Command };
export class DescribeActiveReceiptRuleSetCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DescribeActiveReceiptRuleSet", {})
    .n("SESClient", "DescribeActiveReceiptRuleSetCommand")
    .sc(DescribeActiveReceiptRuleSet$)
    .build() {
}
