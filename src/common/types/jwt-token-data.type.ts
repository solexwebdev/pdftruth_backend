import { IdType } from '@/common/types/id.type';
import { AuthUserData } from '@/common/types/auth-user-data.type';

export interface JwtTokenData {
  iat: number;
  exp: number;
  sub: IdType;
  user: AuthUserData;
}
