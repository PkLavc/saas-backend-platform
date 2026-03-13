import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DescribeReceiptRule$ } from "../schemas/schemas_0";
export { $Command };
export class DescribeReceiptRuleCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DescribeReceiptRule", {})
    .n("SESClient", "DescribeReceiptRuleCommand")
    .sc(DescribeReceiptRule$)
    .build() {
}
