import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateConfigurationSetTrackingOptions$ } from "../schemas/schemas_0";
export { $Command };
export class CreateConfigurationSetTrackingOptionsCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "CreateConfigurationSetTrackingOptions", {})
    .n("SESClient", "CreateConfigurationSetTrackingOptionsCommand")
    .sc(CreateConfigurationSetTrackingOptions$)
    .build() {
}
