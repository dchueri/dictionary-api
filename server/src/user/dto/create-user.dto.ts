import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDTO {
  @IsString({ each: true })
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
