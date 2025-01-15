import { AccountResponse } from '@/accounts/responses/account.response';
import { ProfileResponse } from '@/users/responses/profile.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class MyAccountResponse extends AccountResponse {
  @ResponseProperty({ cls: ProfileResponse })
  profile: ProfileResponse;
}
