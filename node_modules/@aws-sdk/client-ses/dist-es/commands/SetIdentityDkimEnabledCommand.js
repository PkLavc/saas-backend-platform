import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { SetIdentityDkimEnabled$ } from "../schemas/schemas_0";
export { $Command };
export class SetIdentityDkimEnabledCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "SetIdentityDkimEnabled", {})
    .n("SESClient", "SetIdentityDkimEnabledCommand")
    .sc(SetIdentityDkimEnabled$)
    .build() {
}
