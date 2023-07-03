import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { GetCodeDto } from "./dto/get-code.dto";
import { ForgetPasswordDto } from "./dto/forget-password.dto";
import { MailerService } from "@nestjs-modules/mailer";
export declare class UsersService {
    private repo;
    private jwtService;
    private readonly mailerService;
    constructor(repo: Repository<User>, jwtService: JwtService, mailerService: MailerService);
    deleteAll(): Promise<void>;
    findUser(id: number): Promise<User>;
    signup(signupDto: SignupDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        username: string;
        token: {
            access_token: string;
        };
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
    forgetPassword({ email, username }: ForgetPasswordDto): Promise<void>;
    generateRandomNumber(): string;
    generateOTP(): string;
    sendVerificationEmail(email: string, otpCode: string): Promise<void>;
    validatePasswordResetOTP(email: string, otp: string): Promise<boolean>;
}
