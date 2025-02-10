import { AccountResponse } from '@/domains/accounts/responses/account.response';
import { ProfileResponse } from '@/domains/users/responses/profile.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class MyAccountResponse extends AccountResponse {
  @ResponseProperty({ cls: ProfileResponse })
  profile: ProfileResponse;
}
