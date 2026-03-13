"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_project_dto_1 = require("./create-project.dto");
class UpdateProjectDto extends (0, mapped_types_1.PartialType)(create_project_dto_1.CreateProjectDto) {
}
exports.UpdateProjectDto = UpdateProjectDto;
//# sourceMappingURL=update-project.dto.js.map