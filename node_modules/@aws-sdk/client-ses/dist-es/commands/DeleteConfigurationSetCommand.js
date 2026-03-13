import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DeleteConfigurationSet$ } from "../schemas/schemas_0";
export { $Command };
export class DeleteConfigurationSetCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "DeleteConfigurationSet", {})
    .n("SESClient", "DeleteConfigurationSetCommand")
    .sc(DeleteConfigurationSet$)
    .build() {
}
