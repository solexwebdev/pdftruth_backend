import { BaseResponse } from '@/common/responses/base.response';
import { UserStatus } from '@/users/enums/user-status.enum';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class UserResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  id: string;

  @ResponseProperty({ cls: String })
  nickname: string;

  @ResponseProperty({ cls: String })
  email: string;

  @ResponseProperty({ cls: String })
  firstName: string;

  @ResponseProperty({ cls: String })
  lastName: string;

  @ResponseProperty({ enum: UserStatus })
  status: UserStatus;

  @ResponseProperty({ cls: Boolean })
  isEmailConfirmed: boolean;

  @ResponseProperty({ cls: Date })
  createdAt: Date;
}
