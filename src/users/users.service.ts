import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { HashService } from "nestjs-hash";
import { v4 as uuidv4 } from "uuid";
import * as argon2 from "argon2";
import * as otpGenerator from "otp-generator";

import { LoginDto } from "./dto/login.dto";
import { GetCodeDto } from "./dto/get-code.dto";
import { ForgetPasswordDto } from "./dto/forget-password.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { cryptoRandomStringAsync } from "crypto-random-string";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async deleteAll() {
    await this.repo.delete({});
  }

  async findUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async signup(signupDto: SignupDto) {
    const { email, password, username } = signupDto;

    const userExists = await this.repo.findOne({
      where: [{ email }, { username }],
    });

    if (userExists) {
      throw new BadRequestException("User already exists");
    }

    const code = uuidv4();
    const user = this.repo.create({
      email,
      password,
      code,
      username,
    });
    return await this.repo.save(user);
  }

  async login(loginDto: LoginDto) {
    const { email, password, username } = loginDto;

    const user = await this.repo.findOne({ where: [{ email }, { username }] });
    if (!user) {
      throw new BadRequestException("User do not exists");
    }

    const passwordMatches = user.password === password;

    if (!passwordMatches) {
      throw new BadRequestException("Password is incorrect");
    }

    const token = await this.getTokens(user.id);
    return token;
  }

  async loginCode(getCodeDto: GetCodeDto) {
    const { code } = getCodeDto;
    const user = await this.repo.findOne({ where: { code } });

    if (user?.code !== code) {
      throw new BadRequestException("Wrong code");
    }

    return {
      email: user?.email,
      username: user?.username,
    };
  }

  async getTokens(userId: number) {
    const [access_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: `${process.env.JWT_ACCESS_SECRET}`,
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      access_token,
    };
  }

  async getCode(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException("Wrong credentials");
    }

    return { code: user.code };
  }

  async getUsers() {
    const users = await this.repo.find();

    return users;
  }

  async forgetPassword({ email, username }: ForgetPasswordDto) {
    const user = await this.repo.findOne({ where: [{ email }, { username }] });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const otpCode = this.generateOTP();

    const otpCodeExpireDate = new Date();

    otpCodeExpireDate.setMinutes(otpCodeExpireDate.getMinutes() + 1);

    this.sendVerificationEmail(user.email, otpCode);
  }

  generateRandomNumber() {
    const min = 100000;
    const max = 999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }

  generateOTP(): string {
    return this.generateRandomNumber();
  }

  async sendVerificationEmail(email: string, otpCode: string) {
    await this.mailerService.sendMail({
      to: email,
      from: "bengoudifa.contact@gmail.com",
      subject: "OTP Verification",
      html: `<h3>Your OTP code is: ${otpCode}. This code will expire in 3 minutes.</h3>`,
    });
  }

  async validatePasswordResetOTP(email: string, otp: string) {
    const user = await this.repo.findOne({ where: { email } });

    if (!user || user.otpCode !== otp || user.otpCodeExpireDate < new Date()) {
      return false;
    }

    return true;
  }
}
