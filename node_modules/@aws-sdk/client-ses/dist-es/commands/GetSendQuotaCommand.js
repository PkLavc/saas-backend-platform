import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetSendQuota$ } from "../schemas/schemas_0";
export { $Command };
export class GetSendQuotaCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "GetSendQuota", {})
    .n("SESClient", "GetSendQuotaCommand")
    .sc(GetSendQuota$)
    .build() {
}
