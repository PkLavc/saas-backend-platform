import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GetCustomVerificationEmailTemplate$ } from "../schemas/schemas_0";
export { $Command };
export class GetCustomVerificationEmailTemplateCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "GetCustomVerificationEmailTemplate", {})
    .n("SESClient", "GetCustomVerificationEmailTemplateCommand")
    .sc(GetCustomVerificationEmailTemplate$)
    .build() {
}
