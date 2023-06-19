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
exports.BannedService = void 0;
const common_1 = require("@nestjs/common");
const banned_entity_1 = require("./entities/banned.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const fs_1 = require("fs");
const nestjs_twilio_1 = require("nestjs-twilio");
let BannedService = class BannedService {
    constructor(repo, twilioService) {
        this.repo = repo;
        this.twilioService = twilioService;
    }
    async create(createBannedDto, file) {
        const { ipAddress, date, userAgent, requestId } = createBannedDto;
        const banned = this.repo.create({
            ipAddress,
            date,
            userAgent: userAgent !== null && userAgent !== void 0 ? userAgent : '',
            requestId,
            file,
        });
        await this.repo.save(banned);
        const twilioResponse = await this.twilioService.client.messages.create({
            body: `Adress Ip ${banned.ipAddress} was banned due to anomaly traffic`,
            from: '+14067177702',
            to: '+2130781051473',
        });
        console.log('twilio', twilioResponse);
        return banned;
    }
    async findAll() {
        const banned = await this.repo.find();
        return banned;
    }
    async resetPassword(hostname, userId) {
        return Object.assign(Object.assign({}, hostname), { userId });
    }
    async ipAdressExists(ipAddress) {
        const banned = await this.repo.findOne({ where: { ipAddress } });
        return Boolean(banned);
    }
    async findOne(id) {
        const banned = await this.repo.findOne({ where: { id } });
        if (!banned) {
            throw new common_1.NotFoundException('Tuple not found');
        }
        return banned;
    }
    async update(id, updateBannedDto, file) {
        const banned = await this.findOne(id);
        if (file) {
            if (banned.file) {
                (0, fs_1.unlinkSync)(banned.file);
            }
            banned.file = file.path;
        }
        Object.assign(banned, updateBannedDto);
        return this.repo.save(banned);
    }
    async remove(id) {
        const banned = await this.findOne(id);
        (0, fs_1.unlinkSync)(banned.file);
        this.repo.delete(banned);
        return true;
    }
};
BannedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(banned_entity_1.Banned)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        nestjs_twilio_1.TwilioService])
], BannedService);
exports.BannedService = BannedService;
//# sourceMappingURL=banned.service.js.map