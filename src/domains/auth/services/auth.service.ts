import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '@/domains/users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from '@/domains/auth/dto/signin.dto';
import { JwtAuthResponse } from '@/domains/auth/responses/jwt-auth.response';
import { SignupDto } from '@/domains/auth/dto/signup.dto';
import { CryptoUtilService } from '@/common/services/crypto-util.service';
import { User } from '@/domains/users/entities/user.entity';
import { AuthModuleSetting } from '@/domains/auth/consts/auth-module-setting.const';
import { AuthUserData } from '@/common/types/auth-user-data.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { IdType } from '@/common/types/id.type';
import { AuthResponseFactory } from '@/domains/auth/factories/auth-response.factory';
import { ResultResponse } from '@/common/responses/result.response';
import { GoogleAuthClientService } from '@/domains/auth/services/google-auth-client.service';
import { SignInGoogleDto } from '@/domains/auth/dto/signin-google.dto';
import { SocialVendor } from '@/domains/users/enums/social-vendor.enum';
import { UserStatus } from '@/domains/users/enums/user-status.enum';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly cryptoUtilService: CryptoUtilService,
    private readonly jwtService: JwtService,
    private readonly authResponseFactory: AuthResponseFactory,
    private readonly googleAuthClientService: GoogleAuthClientService,
  ) {}

  public async checkUser(userId: IdType): Promise<boolean> {
    await this.usersService.getById(userId);
    return true;
  }

  public async login(signinDto: SigninDto): Promise<JwtAuthResponse> {
    const user = await this.usersService.findByEmail(signinDto.email);

    if (!user) throw new BadRequestException('Wrong email or password.');

    if (!user?.password) throw new BadRequestException('No password has been set.');

    const compared = await this.cryptoUtilService.verifyPasswordHash(signinDto.password, String(user?.password));

    if (!compared) throw new BadRequestException('Wrong email or password.');

    if (user.status === UserStatus.INACTIVE)
      throw new UnprocessableEntityException('Your access has been deactivated.');

    return await this.generateTokenPair(user);
  }

  public async signInWithGoogle(payload: SignInGoogleDto): Promise<JwtAuthResponse> {
    try {
      const tokenData = await this.googleAuthClientService.verifyCredentials({
        code: payload.code,
      });

      const user = await this.usersService.signInWithSocial({
        vendor: SocialVendor.GOOGLE,
        sub: tokenData.sub,
        email: tokenData.email,
        name: tokenData.name,
        firstName: tokenData.given_name,
        lastName: tokenData.family_name,
      });

      if (user.status === UserStatus.INACTIVE)
        throw new UnprocessableEntityException('Your access has been deactivated.');

      return await this.generateTokenPair(user);
    } catch (error) {
      if (!(error instanceof BadRequestException)) throw new BadRequestException(error.message);

      throw new BadRequestException('Process sign in with Google error, please try again later.');
    }
  }

  public async signUp(signupDto: SignupDto): Promise<ResultResponse> {
    const existUser = await this.usersService.existByEmail(signupDto.email);

    if (existUser) throw new BadRequestException('User already exists.');

    const passHash = await this.cryptoUtilService.generatePasswordHash(signupDto.password);

    await this.usersService.register({
      email: signupDto.email,
      password: passHash,
    });

    return new ResultResponse({
      message: 'Registration process successfully.',
    });
  }

  public async refreshToken(refreshToken: string): Promise<JwtAuthResponse> {
    try {
      const tokenData = await this.jwtService.verifyAsync(refreshToken.trim(), {
        secret: this.configService.get(ConfigEnv.JWT_SECRET_KEY),
      });

      const user = await this.usersService.getById(tokenData.sub);

      return this.generateTokenPair(user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotAcceptableException('Refresh token filed.');
    }
  }

  protected async generateTokenPair(user: User): Promise<JwtAuthResponse> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return this.authResponseFactory.createResponse({
      accessToken: accessToken,
      refreshToken: refreshToken,
      accessTokenExpiresAt: Date.now() + AuthModuleSetting.ACCESS_TOKEN_LIFETIME_MS,
      refreshTokenExpiresAt: Date.now() + AuthModuleSetting.REFRESH_TOKEN_LIFETIME_MS,
    });
  }

  protected async generateAccessToken(user: User): Promise<string> {
    const authData: AuthUserData = {
      id: user.id,
      email: user.email,
      nickname: user.nickname || 'anonymous',
      status: user.status,
      memberships: user.memberships.isInitialized()
        ? user.memberships?.map((item) => ({
            id: item.id,
            accountId: item.account.id,
            roleId: item.role.id,
            isDefault: item.isDefault,
          }))
        : null,
    };

    return this.jwtService.signAsync(
      {
        user: authData,
      },
      {
        secret: this.configService.get(ConfigEnv.JWT_SECRET_KEY),
        subject: user.id,
        expiresIn: AuthModuleSetting.ACCESS_TOKEN_EXPIRES_IN,
      },
    );
  }

  protected async generateRefreshToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {},
      {
        secret: this.configService.get(ConfigEnv.JWT_REFRESH_SECRET_KEY),
        subject: user.id,
        expiresIn: AuthModuleSetting.REFRESH_TOKEN_EXPIRES_IN,
      },
    );
  }
}
