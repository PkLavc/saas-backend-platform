import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { ListVerifiedEmailAddresses$ } from "../schemas/schemas_0";
export { $Command };
export class ListVerifiedEmailAddressesCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "ListVerifiedEmailAddresses", {})
    .n("SESClient", "ListVerifiedEmailAddressesCommand")
    .sc(ListVerifiedEmailAddresses$)
    .build() {
}
