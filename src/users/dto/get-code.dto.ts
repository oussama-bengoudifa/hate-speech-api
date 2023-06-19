import { IsNotEmpty, IsString } from "class-validator";

export class GetCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
