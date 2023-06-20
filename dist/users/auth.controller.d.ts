import { UsersService } from "./users.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { GetCodeDto } from "./dto/get-code.dto";
export declare class AuthController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(signupDto: SignupDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    deleteAll(): Promise<void>;
    loginCode(getCodeDto: GetCodeDto): Promise<{
        email: string;
        username: string;
    }>;
    getCode(userId: number): Promise<{
        code: string;
    }>;
    getUsers(): Promise<import("./entities/user.entity").User[]>;
}
