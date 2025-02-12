import { PaginateQuery } from '@/common/dto/paginate.query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SortDocuments } from '@/domains/documents/enums/sort-documents.enum';

export class DocumentsQueryDto extends PaginateQuery {
  @ApiPropertyOptional({ enum: SortDocuments, required: false, nullable: false })
  @IsEnum(SortDocuments)
  @IsOptional()
  sortBy?: SortDocuments;

  @ApiPropertyOptional({ description: 'Search query' })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
