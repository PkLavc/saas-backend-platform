import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListTemplates$ } from "../schemas/schemas_0";
export { $Command };
export class ListTemplatesCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "ListTemplates", {})
    .n("SESClient", "ListTemplatesCommand")
    .sc(ListTemplates$)
    .build() {
}
