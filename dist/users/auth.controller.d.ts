import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshAccessToken(userId: number): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
