import { BaseResponse } from '@/common/responses/base.response';
import { UserResponse } from '@/domains/users/responses/user.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { RoleResponse } from '@/domains/users/responses/role.response';

export class ProfileResponse extends BaseResponse {
  @ResponseProperty({ cls: UserResponse })
  user!: UserResponse;

  @ResponseProperty({ cls: RoleResponse })
  role!: RoleResponse;
}
