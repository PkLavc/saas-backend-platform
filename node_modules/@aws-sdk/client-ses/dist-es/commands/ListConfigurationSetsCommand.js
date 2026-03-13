import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListConfigurationSets$ } from "../schemas/schemas_0";
export { $Command };
export class ListConfigurationSetsCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "ListConfigurationSets", {})
    .n("SESClient", "ListConfigurationSetsCommand")
    .sc(ListConfigurationSets$)
    .build() {
}
