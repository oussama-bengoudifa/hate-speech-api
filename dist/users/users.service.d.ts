import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { GetCodeDto } from "./dto/get-code.dto";
export declare class UsersService {
    private repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    deleteAll(): Promise<void>;
    findUser(id: number): Promise<User>;
    signup(signupDto: SignupDto): Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    loginCode(getCodeDto: GetCodeDto): Promise<{
        email: string;
        username: string;
    }>;
    getTokens(userId: number): Promise<{
        access_token: string;
    }>;
    getCode(id: number): Promise<{
        code: string;
    }>;
    getUsers(): Promise<User[]>;
}
