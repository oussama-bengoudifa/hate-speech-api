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
let UsersService = class UsersService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
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
        const { email, password } = signupDto;
        const userExists = await this.repo.findOne({ where: { email } });
        if (userExists) {
            throw new common_1.BadRequestException("User already exists");
        }
        const code = (0, uuid_1.v4)();
        const user = this.repo.create({
            email,
            password,
            code,
        });
        await this.repo.save(user);
        const token = await this.getTokens(user.id);
        return token;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException("User do not exists");
        }
        const passwordMatches = user.password === password;
        if (!passwordMatches) {
            throw new common_1.BadRequestException("Password is incorrect");
        }
        const token = await this.getTokens(user.id);
        return token;
    }
    async loginCode(getCodeDto) {
        const { code } = getCodeDto;
        const user = await this.repo.findOne({ where: { code } });
        if ((user === null || user === void 0 ? void 0 : user.code) !== code) {
            throw new common_1.BadRequestException("Wrong code");
        }
        return {
            email: user === null || user === void 0 ? void 0 : user.email,
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
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map