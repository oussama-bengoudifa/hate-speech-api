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
exports.BannedController = void 0;
const common_1 = require("@nestjs/common");
const banned_service_1 = require("./banned.service");
const create_banned_dto_1 = require("./dto/create-banned.dto");
const update_banned_dto_1 = require("./dto/update-banned.dto");
const admin_guard_1 = require("../guards/admin.guard");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const current_user_id_decorator_1 = require("../decorators/current-user-id.decorator");
let BannedController = class BannedController {
    constructor(bannedService) {
        this.bannedService = bannedService;
    }
    create(createBannedDto, file) {
        return this.bannedService.create(createBannedDto, file.path);
    }
    findAll() {
        return this.bannedService.findAll();
    }
    findOne(id) {
        return this.bannedService.findOne(id);
    }
    ipAdressExists(ipAddress) {
        return this.bannedService.ipAdressExists(ipAddress);
    }
    resetPassword(request, userId) {
        const hostname = request.headers;
        return this.bannedService.resetPassword(hostname, userId);
    }
    update(id, updateBannedDto, file) {
        return this.bannedService.update(+id, updateBannedDto, file);
    }
    remove(id) {
        return this.bannedService.remove(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banned_dto_1.CreateBannedDto, Object]),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Get)('/ipAddress/:ipAddress'),
    __param(0, (0, common_1.Param)('ipAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "ipAdressExists", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, current_user_id_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number]),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_banned_dto_1.UpdateBannedDto, Object]),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminAccessGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannedController.prototype, "remove", null);
BannedController = __decorate([
    (0, swagger_1.ApiTags)('Banned'),
    (0, common_1.Controller)('banned'),
    __metadata("design:paramtypes", [banned_service_1.BannedService])
], BannedController);
exports.BannedController = BannedController;
//# sourceMappingURL=banned.controller.js.map