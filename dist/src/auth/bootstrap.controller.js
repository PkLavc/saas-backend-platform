"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapController = void 0;
const common_1 = require("@nestjs/common");
const bootstrap_service_1 = require("./bootstrap.service");
const setup_system_dto_1 = require("./dto/setup-system.dto");
const public_decorator_1 = require("./public.decorator");
let BootstrapController = class BootstrapController {
    constructor(bootstrapService) {
        this.bootstrapService = bootstrapService;
    }
    async setupSystem(setupDto) {
        return this.bootstrapService.setupSystem(setupDto);
    }
};
exports.BootstrapController = BootstrapController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('setup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setup_system_dto_1.SetupSystemDto]),
    __metadata("design:returntype", Promise)
], BootstrapController.prototype, "setupSystem", null);
exports.BootstrapController = BootstrapController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [bootstrap_service_1.BootstrapService])
], BootstrapController);
//# sourceMappingURL=bootstrap.controller.js.map