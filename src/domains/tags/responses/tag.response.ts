import { IdType } from '@/common/types/id.type';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { BaseResponse } from '@/common/responses/base.response';

export class TagResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  id: IdType;

  @ResponseProperty({ cls: String })
  name: string;

  @ResponseProperty({ cls: Date })
  createdAt: Date;
}
