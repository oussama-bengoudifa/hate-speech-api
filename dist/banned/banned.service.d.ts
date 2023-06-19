import { CreateBannedDto } from './dto/create-banned.dto';
import { UpdateBannedDto } from './dto/update-banned.dto';
import { Banned } from './entities/banned.entity';
import { Repository } from 'typeorm';
import { TwilioService } from 'nestjs-twilio';
export declare class BannedService {
    private repo;
    private readonly twilioService;
    constructor(repo: Repository<Banned>, twilioService: TwilioService);
    create(createBannedDto: CreateBannedDto, file: string): Promise<Banned>;
    findAll(): Promise<Banned[]>;
    resetPassword(hostname: any, userId: number): Promise<any>;
    ipAdressExists(ipAddress: string): Promise<boolean>;
    findOne(id: number): Promise<Banned>;
    update(id: number, updateBannedDto: UpdateBannedDto, file: any): Promise<Banned>;
    remove(id: number): Promise<boolean>;
}
