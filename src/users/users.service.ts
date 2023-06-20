import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { HashService } from "nestjs-hash";
import { v4 as uuidv4 } from "uuid";
import * as argon2 from "argon2";

import { LoginDto } from "./dto/login.dto";
import { GetCodeDto } from "./dto/get-code.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService
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

    const userExists = await this.repo.findOne({ where: { email } });

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
    await this.repo.save(user);
    const token = await this.getTokens(user.id);
    return token;
  }

  async login(loginDto: LoginDto) {
    const { email, password, username } = loginDto;

    const user = await this.repo.findOne({ where: { email, username } });
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
}
