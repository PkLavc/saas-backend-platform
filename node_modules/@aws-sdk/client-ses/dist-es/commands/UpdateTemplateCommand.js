import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateTemplate$ } from "../schemas/schemas_0";
export { $Command };
export class UpdateTemplateCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "UpdateTemplate", {})
    .n("SESClient", "UpdateTemplateCommand")
    .sc(UpdateTemplate$)
    .build() {
}
