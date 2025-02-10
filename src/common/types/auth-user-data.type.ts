import { UserStatus } from '@/domains/users/enums/user-status.enum';
import { IdType } from '@/common/types/id.type';

export type MembershipData = {
  id: IdType;
  accountId: IdType;
  roleId: IdType;
  isDefault: boolean;
};

export type AuthUserData = {
  id: IdType;
  email: string;
  nickname: string;
  status: UserStatus;
  memberships: MembershipData[] | null;
};
