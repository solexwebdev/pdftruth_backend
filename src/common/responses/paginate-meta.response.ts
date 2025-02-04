import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { IPaginateMeta } from '@/common/interfaces/paginate-meta.interface';

export class PaginateMetaResponse {
  @ResponseProperty({ cls: Number })
  itemCount: number;

  @ResponseProperty({ cls: Number })
  totalItems: number;

  @ResponseProperty({ cls: Number })
  itemsPerPage: number;

  @ResponseProperty({ cls: Number })
  totalPages: number;

  @ResponseProperty({ cls: Number })
  currentPage: number;

  @ResponseProperty({ cls: Boolean })
  hasNextPage: boolean;

  @ResponseProperty({ cls: Boolean })
  hasPreviousPage: boolean;

  constructor({ pageOptions, itemCount, totalItems }: IPaginateMeta) {
    this.itemCount = itemCount;
    this.totalItems = totalItems;
    this.itemsPerPage = pageOptions.take as number;
    this.totalPages = Math.ceil(totalItems / Number(pageOptions.take));
    this.currentPage = pageOptions.page as number;
    this.hasPreviousPage = Number(pageOptions.page) > 1;
    this.hasNextPage = Number(pageOptions.page) < this.totalPages;
  }
}
