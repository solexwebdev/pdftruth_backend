import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TagsService } from '@/domains/tags/services/tags.service';
import { IdType } from '@/common/types/id.type';
import { UserToken } from '@/domains/auth/decorators/user-token.decorator';
import { JwtTokenData } from '@/common/types/jwt-token-data.type';
import { CreateTagDto } from '@/domains/tags/dto/create-tag.dto';
import { UsersService } from '@/domains/users/services/users.service';
import { UserAuth } from '@/domains/auth/decorators/user-auth.decorator';
import { BadRequestResponse } from '@/common/responses/bad-request.response';
import { AccountsService } from '@/domains/accounts/services/accounts.service';
import { ArrayTagsFactory } from '@/domains/tags/factories/array-tags.factory';
import { ArrayTagsResponse } from '@/domains/tags/responses/array-tags.response';
import { TagsResponse } from '@/domains/tags/responses/tags.response';
import { TagsQueryDto } from '@/domains/tags/dto/tags-query.dto';
import { TagsFactory } from '@/domains/tags/factories/tags.factory';
import { PaginateMetaResponse } from '@/common/responses/paginate-meta.response';
import { ResultResponse } from '@/common/responses/result.response';

@ApiTags('Tags')
@Controller('accounts/:accountId/tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
    private readonly arrayTagsFactory: ArrayTagsFactory,
    private readonly tagsFactory: TagsFactory,
  ) {}

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Save new tag' })
  @ApiOkResponse({ type: ArrayTagsResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiBody({ type: CreateTagDto })
  @Post()
  @UserAuth()
  public async save(
    @Param('accountId') accountId: IdType,
    @UserToken() tokenData: JwtTokenData,
    @Body() body: CreateTagDto,
  ): Promise<ArrayTagsResponse> {
    try {
      await this.usersService.hasAccountAccess(tokenData.sub, accountId);
      const account = await this.accountsService.getById(accountId);
      const tags = await this.tagsService.saveMany({ account, ...body });

      return this.arrayTagsFactory.createResponse(tags);
    } catch (error) {
      throw new BadRequestException('Unable to create tags');
    }
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Fetch tag list' })
  @ApiOkResponse({ type: TagsResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Get()
  @UserAuth()
  public async fetch(
    @Param('accountId') accountId: IdType,
    @Query() query: TagsQueryDto,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<TagsResponse> {
    try {
      await this.usersService.hasAccountAccess(tokenData.sub, accountId);

      const [tags, count] = await this.tagsService.fetch({ accountId, query });

      return this.tagsFactory.createResponse(tags, {
        meta: new PaginateMetaResponse({
          pageOptions: query,
          totalItems: count,
          itemCount: tags.length,
        }) as any,
      });
    } catch (error) {
      throw new BadRequestException('Unable to fetch tags.');
    }
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Delete tag' })
  @ApiOkResponse({ type: ResultResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Delete(':id')
  @UserAuth()
  public async delete(
    @Param('accountId') accountId: IdType,
    @Param('id') id: IdType,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<ResultResponse> {
    try {
      await this.usersService.hasAccountAccess(tokenData.sub, accountId);
      const account = await this.accountsService.getById(accountId);

      await this.tagsService.deleteForAccount(account, id);

      return new ResultResponse({ message: `Deleted tag successfully.` });
    } catch (error) {
      throw new BadRequestException('Unable to delete tags');
    }
  }
}
