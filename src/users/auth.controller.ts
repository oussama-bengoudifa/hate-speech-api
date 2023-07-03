import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { LoginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { SignupDto } from "./dto/signup.dto";
import { AccessTokenAccessGuard } from "src/guards/accessToken.guard";
import { CurrentUserId } from "src/decorators/current-user-id.decorator";
import { GetCodeDto } from "./dto/get-code.dto";
import { ForgetPasswordDto } from "./dto/forget-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const result = await this.usersService.login(loginDto);
    return result;
  }

  @Post("reset-password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email, code, newPassword } = resetPasswordDto;

    const isOTPValid = await this.usersService.validatePasswordResetOTP(
      email,
      code
    );

    if (!isOTPValid) {
      throw new BadRequestException("Invalid OTP");
    }

    // Update the user's password
    const user = await this.repo.findOne({ where: { email } });
    user.password = newPassword;

    // Clear the reset password OTP and its expiration time
    user.otpCode = null;
    user.otpCodeExpireDate = null;

    await this.repo.save(user);

    return {
      message: "Your password was changed successfully",
      status: 200,
      user,
    };
  }

  @Post("forget-password")
  async forgetPassword(@Body() { email, username }: ForgetPasswordDto) {
    const user = await this.repo.findOne({ where: [{ email }, { username }] });

    if (!user) {
      throw new NotFoundException("user not found");
    }
    const otpCode = this.usersService.generateOTP();

    const otpCodeExpireDate = new Date();

    otpCodeExpireDate.setMinutes(otpCodeExpireDate.getMinutes() + 3);

    user.otpCode = otpCode;
    user.otpCodeExpireDate = otpCodeExpireDate;

    this.usersService.sendVerificationEmail(email, otpCode);

    await this.repo.save(user);

    return { message: "check your email", status: 200 };
  }

  @Delete("users")
  async deleteAll() {
    return await this.usersService.deleteAll();
  }

  @Post("login-code")
  async loginCode(@Body() getCodeDto: GetCodeDto) {
    const result = await this.usersService.loginCode(getCodeDto);
    return result;
  }

  @UseGuards(AccessTokenAccessGuard)
  @Get("code")
  async getCode(@CurrentUserId() userId: number) {
    const result = await this.usersService.getCode(userId);
    return result;
  }

  @Get("users")
  async getUsers() {
    return await this.usersService.getUsers();
  }
}
