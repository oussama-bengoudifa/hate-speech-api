"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannedModule = void 0;
const common_1 = require("@nestjs/common");
const banned_service_1 = require("./banned.service");
const banned_controller_1 = require("./banned.controller");
const banned_entity_1 = require("./entities/banned.entity");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_twilio_1 = require("nestjs-twilio");
const config_1 = require("@nestjs/config");
let BannedModule = class BannedModule {
};
BannedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([banned_entity_1.Banned]),
            nestjs_twilio_1.TwilioModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (cfg) => ({
                    accountSid: 'AC9436808ab3b30aa9bb0112d3c94b58ad',
                    authToken: '9c23e99c1d6bd95aecb94d08c643caa7',
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [banned_controller_1.BannedController],
        providers: [banned_service_1.BannedService],
    })
], BannedModule);
exports.BannedModule = BannedModule;
//# sourceMappingURL=banned.module.js.map