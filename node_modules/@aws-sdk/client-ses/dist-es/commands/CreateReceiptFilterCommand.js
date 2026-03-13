import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateReceiptFilter$ } from "../schemas/schemas_0";
export { $Command };
export class CreateReceiptFilterCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "CreateReceiptFilter", {})
    .n("SESClient", "CreateReceiptFilterCommand")
    .sc(CreateReceiptFilter$)
    .build() {
}
