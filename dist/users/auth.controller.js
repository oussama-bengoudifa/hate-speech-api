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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const signup_dto_1 = require("./dto/signup.dto");
const accessToken_guard_1 = require("../guards/accessToken.guard");
const current_user_id_decorator_1 = require("../decorators/current-user-id.decorator");
const get_code_dto_1 = require("./dto/get-code.dto");
const forget_password_dto_1 = require("./dto/forget-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AuthController = class AuthController {
    constructor(usersService, repo) {
        this.usersService = usersService;
        this.repo = repo;
    }
    async signup(signupDto) {
        return this.usersService.signup(signupDto);
    }
    async login(loginDto) {
        const result = await this.usersService.login(loginDto);
        return result;
    }
    async resetPassword(resetPasswordDto) {
        const { email, code, newPassword } = resetPasswordDto;
        const isOTPValid = await this.usersService.validatePasswordResetOTP(email, code);
        if (!isOTPValid) {
            throw new common_1.BadRequestException("Invalid OTP");
        }
        const user = await this.repo.findOne({ where: { email } });
        user.password = newPassword;
        user.otpCode = null;
        user.otpCodeExpireDate = null;
        await this.repo.save(user);
        return {
            message: "Your password was changed successfully",
            status: 200,
            user,
        };
    }
    async forgetPassword({ email, username }) {
        const user = await this.repo.findOne({ where: [{ email }, { username }] });
        if (!user) {
            throw new common_1.NotFoundException("user not found");
        }
        const otpCode = this.usersService.generateOTP();
        const otpCodeExpireDate = new Date();
        otpCodeExpireDate.setMinutes(otpCodeExpireDate.getMinutes() + 3);
        user.otpCode = otpCode;
        user.otpCodeExpireDate = otpCodeExpireDate;
        this.usersService.sendVerificationEmail(email, otpCode);
        await this.repo.save(user);
        return { message: "check your email", status: 200 };
    }
    async deleteAll() {
        return await this.usersService.deleteAll();
    }
    async loginCode(getCodeDto) {
        const result = await this.usersService.loginCode(getCodeDto);
        return result;
    }
    async getCode(userId) {
        const result = await this.usersService.getCode(userId);
        return result;
    }
    async getUsers() {
        return await this.usersService.getUsers();
    }
};
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("forget-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_password_dto_1.ForgetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Delete)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Post)("login-code"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_code_dto_1.GetCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginCode", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenAccessGuard),
    (0, common_1.Get)("code"),
    __param(0, (0, current_user_id_decorator_1.CurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCode", null);
__decorate([
    (0, common_1.Get)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_1.Repository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map