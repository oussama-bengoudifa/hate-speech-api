import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AccessTokenStrategy } from "src/strategies/accessToken.strategy";
import { HashModule } from "nestjs-hash";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    PassportModule,
    HashModule.forRoot({ type: "sha256" }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: "bengoudifa.contact@gmail.com",
          pass: "wttfaqvgbhbaykob",
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AccessTokenStrategy],
})
export class UsersModule {}
