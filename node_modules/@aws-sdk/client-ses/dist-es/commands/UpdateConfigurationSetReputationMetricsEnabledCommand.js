import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateConfigurationSetReputationMetricsEnabled$ } from "../schemas/schemas_0";
export { $Command };
export class UpdateConfigurationSetReputationMetricsEnabledCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "UpdateConfigurationSetReputationMetricsEnabled", {})
    .n("SESClient", "UpdateConfigurationSetReputationMetricsEnabledCommand")
    .sc(UpdateConfigurationSetReputationMetricsEnabled$)
    .build() {
}
