"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_dto_1 = require("./create-task.dto");
class UpdateTaskDto extends (0, mapped_types_1.PartialType)(create_task_dto_1.CreateTaskDto) {
}
exports.UpdateTaskDto = UpdateTaskDto;
//# sourceMappingURL=update-task.dto.js.map