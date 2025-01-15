import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInGoogleDto {
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
