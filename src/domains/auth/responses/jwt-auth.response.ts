import { BaseResponse } from '@/common/responses/base.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class JwtAuthResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  accessToken: string;

  @ResponseProperty({ cls: String })
  refreshToken: string;

  @ResponseProperty({ cls: Date })
  accessTokenExpiresAt: Date;

  @ResponseProperty({ cls: Date })
  refreshTokenExpiresAt: Date;
}
