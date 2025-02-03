import { PaginateQuery } from '@/common/dto/paginate.query.dto';

export interface IPaginateMeta {
  pageOptions: PaginateQuery;
  itemCount: number;
  totalItems: number;
}
