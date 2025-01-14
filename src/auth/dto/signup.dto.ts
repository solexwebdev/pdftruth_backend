import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsValidPassword } from '@/common/decorators/is-valid-password.decorator';

export class SignupDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsValidPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(21)
  nickname: string;
}
