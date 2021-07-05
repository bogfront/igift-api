import { IsString, IsMobilePhone, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  
  @IsString()
  name: string;
  
  @IsString()
  secondName: string;
  
  @IsMobilePhone()
  phone: string
}

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CheckEmailDto {
  @IsEmail()
  email: string;
}
