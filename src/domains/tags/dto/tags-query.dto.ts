import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginateQuery } from '@/common/dto/paginate.query.dto';

export class TagsQueryDto extends PaginateQuery {
  @ApiPropertyOptional({ description: 'Filter by tag name' })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
