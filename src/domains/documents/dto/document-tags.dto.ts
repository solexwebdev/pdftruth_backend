import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';
import { IdType } from '@/common/types/id.type';

export class DocumentTagsDto {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  tagIds: IdType[];
}
