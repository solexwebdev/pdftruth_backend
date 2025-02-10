import { AccountResponse } from '@/domains/accounts/responses/account.response';
import { withArrayResponse } from '@/common/mixins/with-array.response.mixin';

export class AccountsResponse extends withArrayResponse(AccountResponse) {}
