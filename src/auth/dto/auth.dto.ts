import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

// Ở đây phải dùng class bởi vì khi biên dịch ra JavaScript, class được "preserved as real entities", còn interface thì bị loại bỏ trong quá trình biên dịch
export class AuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
