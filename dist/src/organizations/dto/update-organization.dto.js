"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrganizationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_organization_dto_1 = require("./create-organization.dto");
class UpdateOrganizationDto extends (0, mapped_types_1.PartialType)(create_organization_dto_1.CreateOrganizationDto) {
}
exports.UpdateOrganizationDto = UpdateOrganizationDto;
//# sourceMappingURL=update-organization.dto.js.map