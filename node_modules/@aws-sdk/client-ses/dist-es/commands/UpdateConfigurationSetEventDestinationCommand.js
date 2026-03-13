import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateConfigurationSetEventDestination$ } from "../schemas/schemas_0";
export { $Command };
export class UpdateConfigurationSetEventDestinationCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "UpdateConfigurationSetEventDestination", {})
    .n("SESClient", "UpdateConfigurationSetEventDestinationCommand")
    .sc(UpdateConfigurationSetEventDestination$)
    .build() {
}
