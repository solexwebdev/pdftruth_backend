import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@/auth/services/auth.service';
import { SigninDto } from '@/auth/dto/signin.dto';
import { JwtAuthResponse } from '@/auth/responses/jwt-auth.response';
import { SignupDto } from '@/auth/dto/signup.dto';
import { BadRequestResponse } from '@/common/responses/bad-request.response';
import { RefreshTokenDto } from '@/auth/dto/refresh-token.dto';
import { ResultResponse } from '@/common/responses/result.response';
import { SignInGoogleDto } from '@/auth/dto/signin-google.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: SigninDto })
  @ApiOkResponse({
    type: JwtAuthResponse,
    description: 'Success',
  })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<JwtAuthResponse> {
    return this.authService.login(signinDto);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: SignInGoogleDto })
  @ApiOkResponse({
    type: JwtAuthResponse,
    description: 'Success',
  })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @HttpCode(HttpStatus.OK)
  @Post('google')
  async signinWithGoogle(@Body() signInGoogleDto: SignInGoogleDto): Promise<JwtAuthResponse> {
    return this.authService.signInWithGoogle(signInGoogleDto);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({
    type: JwtAuthResponse,
    description: 'Success',
  })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<JwtAuthResponse> {
    const { refreshToken } = refreshTokenDto;
    return this.authService.refreshToken(refreshToken);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SigninDto })
  @ApiCreatedResponse({
    type: ResultResponse,
    description: 'Success',
  })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<ResultResponse> {
    return this.authService.signUp(signupDto);
  }
}
