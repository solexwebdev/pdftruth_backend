import { BaseResponse } from '@/common/responses/base.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class ResultResponse extends BaseResponse<ResultResponse> {
  @ResponseProperty({ cls: String })
  message: string;
}
