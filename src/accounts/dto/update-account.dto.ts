import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IsValidPassword } from '@/common/decorators/is-valid-password.decorator';

export class UpdateAccountDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(50)
  @IsOptional()
  nickname: string;

  @ApiProperty()
  @MaxLength(50)
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @MaxLength(50)
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsValidPassword()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsValidPassword()
  @IsOptional()
  oldPassword?: string;
}
