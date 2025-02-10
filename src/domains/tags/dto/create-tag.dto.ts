import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @MinLength(1, { each: true })
  names: string[];
}
