import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  validate() {
    if (!this.email) {
      if (!this.username) {
        throw new Error("At least one of email or username is required");
      }
    }
    if (!this.username) {
      if (!this.email) {
        throw new Error("At least one of email or username is required");
      }
    }
  }
}
