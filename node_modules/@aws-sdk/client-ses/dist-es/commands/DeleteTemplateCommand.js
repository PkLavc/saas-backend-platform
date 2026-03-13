import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteTemplate$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteTemplateCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DeleteTemplate", {})
    .n("SESClient", "DeleteTemplateCommand")
    .sc(DeleteTemplate$)
    .build() {
}
