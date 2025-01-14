import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AccountsService } from '@/accounts/services/accounts.service';
import { UserAuth } from '@/auth/decorators/user-auth.decorator';
import { UserToken } from '@/auth/decorators/user-token.decorator';
import { JwtTokenData } from '@/common/types/jwt-token-data.type';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponse } from '@/common/responses/bad-request.response';
import { AccountResponse } from '@/accounts/responses/account.response';
import { AccountFactory } from '@/accounts/factories/account.factory';
import { AccountsFactory } from '@/accounts/factories/accounts.factory';
import { AccountsResponse } from '@/accounts/responses/accounts.response';
import { UpdateAccountDto } from '@/accounts/dto/update-account.dto';
import { IdType } from '@/common/types/id.type';
@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly accountFactory: AccountFactory,
    private readonly accountsFactory: AccountsFactory,
  ) {}

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Retrieve all accounts for user' })
  @ApiOkResponse({ type: AccountsResponse })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Get()
  @UserAuth()
  public async myAccounts(
    @UserToken() tokenData: JwtTokenData,
  ): Promise<AccountsResponse> {
    const accounts = await this.accountsService.getUserAccounts(
      tokenData.user.id,
    );

    return this.accountsFactory.createResponse(accounts);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Retrieve user default account' })
  @ApiOkResponse({ type: AccountResponse })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Get('default')
  @UserAuth()
  public async myAccount(
    @UserToken() tokenData: JwtTokenData,
  ): Promise<AccountResponse> {
    const account = await this.accountsService.getDefaultAccount(
      tokenData.user.id,
    );

    return this.accountFactory.createResponse(account);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Update account' })
  @ApiOkResponse({ type: AccountResponse })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Patch(':accountId')
  @UserAuth()
  public async update(
    @Param('accountId') accountId: IdType,
    @Body() updateAccountDto: UpdateAccountDto,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<AccountResponse> {
    const result = await this.accountsService.update({
      userId: tokenData.sub,
      accountId,
      updateAccountDto,
    });

    return this.accountFactory.createResponse(result);
  }
}
