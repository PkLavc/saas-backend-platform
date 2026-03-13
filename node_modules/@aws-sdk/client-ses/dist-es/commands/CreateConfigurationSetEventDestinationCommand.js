import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateConfigurationSetEventDestination$ } from "../schemas/schemas_0";
export { $Command };
export class CreateConfigurationSetEventDestinationCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "CreateConfigurationSetEventDestination", {})
    .n("SESClient", "CreateConfigurationSetEventDestinationCommand")
    .sc(CreateConfigurationSetEventDestination$)
    .build() {
}
