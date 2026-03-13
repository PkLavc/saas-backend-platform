import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListReceiptRuleSets$ } from "../schemas/schemas_0";
export { $Command };
export class ListReceiptRuleSetsCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "ListReceiptRuleSets", {})
    .n("SESClient", "ListReceiptRuleSetsCommand")
    .sc(ListReceiptRuleSets$)
    .build() {
}
