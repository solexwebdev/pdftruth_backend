import { BaseResponse } from '@/common/responses/base.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class DocumentResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  id: string;

  @ResponseProperty({ cls: String })
  name: string;

  @ResponseProperty({ cls: Number })
  size: number;

  @ResponseProperty({ cls: String })
  url: string;

  @ResponseProperty({ cls: Date })
  createdAt: Date;
}
