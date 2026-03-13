import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateCustomVerificationEmailTemplate$ } from "../schemas/schemas_0";
export { $Command };
export class UpdateCustomVerificationEmailTemplateCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
})
    .s("SimpleEmailService", "UpdateCustomVerificationEmailTemplate", {})
    .n("SESClient", "UpdateCustomVerificationEmailTemplateCommand")
    .sc(UpdateCustomVerificationEmailTemplate$)
    .build() {
}
