import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { LoginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { SignupDto } from "./dto/signup.dto";
import { AccessTokenAccessGuard } from "src/guards/accessToken.guard";
import { CurrentUserId } from "src/decorators/current-user-id.decorator";
import { GetCodeDto } from "./dto/get-code.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const result = await this.usersService.login(loginDto);
    return result;
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
