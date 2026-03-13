import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateConfigurationSet$ } from "../schemas/schemas_0";
export { $Command };
export class CreateConfigurationSetCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "CreateConfigurationSet", {})
    .n("SESClient", "CreateConfigurationSetCommand")
    .sc(CreateConfigurationSet$)
    .build() {
}
