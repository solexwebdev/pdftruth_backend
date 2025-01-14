import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
