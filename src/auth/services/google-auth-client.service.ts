import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ConfigEnv } from '@/common/enums/config-env.enum';

@Injectable()
export class GoogleAuthClientService {
  private client = new OAuth2Client({
    clientId: this.configService.get<string>(ConfigEnv.GOOGLE_CLIENT_ID),
    clientSecret: this.configService.get<string>(ConfigEnv.GOOGLE_CLIENT_SECRET),
    redirectUri: this.configService.get<string>(ConfigEnv.GOOGLE_REDIRECT_URL),
  });

  constructor(private readonly configService: ConfigService) {}

  public async verifyCredentials(payload: { code: string }): Promise<TokenPayload> {
    const tokenResponse = await this.client.getToken(payload.code);

    const ticket = await this.client.verifyIdToken({
      idToken: tokenResponse.tokens.id_token as string,
      audience: this.configService.get<string>(ConfigEnv.GOOGLE_CLIENT_ID),
    });

    const tokenPayload = ticket.getPayload();

    if (!tokenPayload?.sub) throw new NotAcceptableException('Wrong token payload data.');

    return tokenPayload;
  }
}
