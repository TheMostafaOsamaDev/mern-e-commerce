import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, { message: 'First name is too short' })
  @MaxLength(50, { message: 'First name is too long' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, { message: 'Last name is too short' })
  @MaxLength(50, { message: 'Last name is too long' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, {
    message: 'Password is too short, at least characters required',
  })
  password: string;

  @IsBoolean({ message: 'isAdmin must be a boolean' })
  isAdmin: boolean;

  @IsString({ message: 'Password must be a string' })
  otp: string;
}
