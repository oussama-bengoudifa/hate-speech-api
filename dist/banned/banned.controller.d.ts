import { BannedService } from './banned.service';
import { CreateBannedDto } from './dto/create-banned.dto';
import { UpdateBannedDto } from './dto/update-banned.dto';
export declare class BannedController {
    private readonly bannedService;
    constructor(bannedService: BannedService);
    create(createBannedDto: CreateBannedDto, file: any): Promise<import("./entities/banned.entity").Banned>;
    findAll(): Promise<import("./entities/banned.entity").Banned[]>;
    findOne(id: number): Promise<import("./entities/banned.entity").Banned>;
    ipAdressExists(ipAddress: string): Promise<boolean>;
    resetPassword(request: Request, userId: number): Promise<any>;
    update(id: string, updateBannedDto: UpdateBannedDto, file: any): Promise<import("./entities/banned.entity").Banned>;
    remove(id: string): Promise<boolean>;
}
