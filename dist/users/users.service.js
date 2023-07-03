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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const uuid_1 = require("uuid");
const mailer_1 = require("@nestjs-modules/mailer");
let UsersService = class UsersService {
    constructor(repo, jwtService, mailerService) {
        this.repo = repo;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async deleteAll() {
        await this.repo.delete({});
    }
    async findUser(id) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async signup(signupDto) {
        const { email, password, username } = signupDto;
        const userExists = await this.repo.findOne({
            where: { email },
        });
        if (userExists) {
            throw new common_1.BadRequestException("User already exists");
        }
        const code = (0, uuid_1.v4)();
        const user = this.repo.create({
            email,
            password,
            code,
            username,
        });
        return await this.repo.save(user);
    }
    async login(loginDto) {
        const { email, password, username } = loginDto;
        const user = await this.repo.findOne({ where: [{ email }, { username }] });
        if (!user) {
            throw new common_1.BadRequestException("User do not exists");
        }
        const passwordMatches = user.password === password;
        if (!passwordMatches) {
            throw new common_1.BadRequestException("Password is incorrect");
        }
        const token = await this.getTokens(user.id);
        const u = { username: user.username };
        return Object.assign({ token }, u);
    }
    async loginCode(getCodeDto) {
        const { code } = getCodeDto;
        const user = await this.repo.findOne({ where: { code } });
        if ((user === null || user === void 0 ? void 0 : user.code) !== code) {
            throw new common_1.BadRequestException("Wrong code");
        }
        return {
            email: user === null || user === void 0 ? void 0 : user.email,
            username: user === null || user === void 0 ? void 0 : user.username,
        };
    }
    async getTokens(userId) {
        const [access_token] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
            }, {
                secret: `${process.env.JWT_ACCESS_SECRET}`,
                expiresIn: "7d",
            }),
        ]);
        return {
            access_token,
        };
    }
    async getCode(id) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("Wrong credentials");
        }
        return { code: user.code };
    }
    async getUsers() {
        const users = await this.repo.find();
        return users;
    }
    async forgetPassword({ email, username }) {
        const user = await this.repo.findOne({ where: [{ email }, { username }] });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const otpCode = this.generateOTP();
        const otpCodeExpireDate = new Date();
        otpCodeExpireDate.setMinutes(otpCodeExpireDate.getMinutes() + 1);
        this.sendVerificationEmail(user.email, otpCode);
    }
    generateRandomNumber() {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    }
    generateOTP() {
        return this.generateRandomNumber();
    }
    async sendVerificationEmail(email, otpCode) {
        await this.mailerService.sendMail({
            to: email,
            from: "bengoudifa.contact@gmail.com",
            subject: "OTP Verification",
            html: `<h3>Your OTP code is: ${otpCode}. This code will expire in 3 minutes.</h3>`,
        });
    }
    async validatePasswordResetOTP(email, otp) {
        const user = await this.repo.findOne({ where: { email } });
        if (!user || user.otpCode !== otp || user.otpCodeExpireDate < new Date()) {
            return false;
        }
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map