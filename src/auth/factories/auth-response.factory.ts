import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { JwtAuthResponse } from '@/auth/responses/jwt-auth.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthResponseFactory extends BaseResponseFactory<any, JwtAuthResponse> {
  createResponse(entity: any): Promise<JwtAuthResponse> | JwtAuthResponse {
    return new JwtAuthResponse({ ...entity });
  }
}
