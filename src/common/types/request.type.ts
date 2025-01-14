import type { Request as ExpressRequest } from 'express';
import { JwtTokenData } from '@/common/types/jwt-token-data.type';

export type Request = ExpressRequest & { tokenData?: JwtTokenData };
