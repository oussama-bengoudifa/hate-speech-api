"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const accessToken_strategy_1 = require("../strategies/accessToken.strategy");
const nestjs_hash_1 = require("nestjs-hash");
const mailer_1 = require("@nestjs-modules/mailer");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({}),
            passport_1.PassportModule,
            nestjs_hash_1.HashModule.forRoot({ type: "sha256" }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "smtp.gmail.com",
                    secure: true,
                    port: 465,
                    auth: {
                        user: "bengoudifa.contact@gmail.com",
                        pass: "wttfaqvgbhbaykob",
                    },
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [users_service_1.UsersService, accessToken_strategy_1.AccessTokenStrategy],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map