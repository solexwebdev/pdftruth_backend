import { BaseResponse } from '@/common/responses/base.response';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse extends BaseResponse {
  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  error: string;
}
