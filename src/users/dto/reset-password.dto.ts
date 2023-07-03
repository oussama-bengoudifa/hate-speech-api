import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
