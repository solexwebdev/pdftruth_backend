import { PaginateQuery } from '@/common/dto/paginate.query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class DocumentsQueryDto extends PaginateQuery {
  @ApiPropertyOptional({ description: 'Search query' })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
