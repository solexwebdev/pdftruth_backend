import { BaseResponse } from '@/common/responses/base.response';
import { IdType } from '@/common/types/id.type';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class AccountResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  id: IdType;

  @ResponseProperty({ cls: String })
  name: string;

  @ResponseProperty({ cls: Boolean })
  isDefault: boolean;

  @ResponseProperty({ cls: String })
  createdAt: string;
}
