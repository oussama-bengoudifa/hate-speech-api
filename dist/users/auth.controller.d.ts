import { UsersService } from "./users.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { GetCodeDto } from "./dto/get-code.dto";
import { ForgetPasswordDto } from "./dto/forget-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class AuthController {
    private readonly usersService;
    private repo;
    constructor(usersService: UsersService, repo: Repository<User>);
    signup(signupDto: SignupDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        username: string;
        token: {
            access_token: string;
        };
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        status: number;
        user: User;
    }>;
    forgetPassword({ email, username }: ForgetPasswordDto): Promise<{
        message: string;
        status: number;
    }>;
    deleteAll(): Promise<void>;
    loginCode(getCodeDto: GetCodeDto): Promise<{
        email: string;
        username: string;
    }>;
    getCode(userId: number): Promise<{
        code: string;
    }>;
    getUsers(): Promise<User[]>;
}
