import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentsService } from '@/domains/documents/services/documents.service';
import { UserAuth } from '@/domains/auth/decorators/user-auth.decorator';
import { UserToken } from '@/domains/auth/decorators/user-token.decorator';
import { JwtTokenData } from '@/common/types/jwt-token-data.type';
import { BadRequestResponse } from '@/common/responses/bad-request.response';
import { UploadFile } from '@/common/decorators/upload-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdType } from '@/common/types/id.type';
import { DocumentsQueryDto } from '@/domains/documents/dto/documents-query.dto';
import { UsersService } from '@/domains/users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { DocumentResponse } from '@/domains/documents/responses/document.response';
import { DocumentFactory } from '@/domains/documents/factories/document.factory';
import { ResultResponse } from '@/common/responses/result.response';
import { DocumentsFactory } from '@/domains/documents/factories/documents.factory';
import { PaginateMetaResponse } from '@/common/responses/paginate-meta.response';
import { DocumentsResponse } from '@/domains/documents/responses/documents.response';
import { DocumentTagsDto } from '@/domains/documents/dto/document-tags.dto';
import { CheckPoints } from '@/domains/points/decorators/check-points.decorator';

@ApiTags('Documents')
@Controller('accounts/:accountId/documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly usersService: UsersService,
    private readonly documentFactory: DocumentFactory,
    private readonly documentsFactory: DocumentsFactory,
    private readonly configService: ConfigService,
  ) {}

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Upload PDF document' })
  @ApiOkResponse({ type: DocumentResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiConsumes('multipart/form-data')
  @UploadFile('file')
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @UserAuth()
  @CheckPoints()
  public async save(
    @Param('accountId') accountId: IdType,
    @UserToken() tokenData: JwtTokenData,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: '.(pdf)' }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * Number(process.env.UPLOAD_MAX_FILE_SIZE),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<DocumentResponse> {
    try {
      await this.usersService.hasAccountAccess(tokenData.sub, accountId);

      const result = await this.documentsService.create({ accountId, file });

      return await this.documentFactory.createResponse(result);
    } catch (error) {
      throw new BadRequestException('Upload failed.');
    }
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Fetch document list' })
  @ApiOkResponse({ type: DocumentsResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Get()
  @UserAuth()
  public async fetch(
    @Param('accountId') accountId: IdType,
    @Query() query: DocumentsQueryDto,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<DocumentsResponse> {
    await this.usersService.hasAccountAccess(tokenData.sub, accountId);

    const [documents, count] = await this.documentsService.fetchByAccountId({ accountId, query });

    return await this.documentsFactory.createResponse(documents, {
      meta: new PaginateMetaResponse({
        pageOptions: query,
        totalItems: count,
        itemCount: documents.length,
      }) as any,
    });
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Get document details' })
  @ApiOkResponse({ type: DocumentResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Get(':documentId')
  @UserAuth()
  public async get(
    @Param('accountId') accountId: IdType,
    @Param('documentId') documentId: IdType,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<DocumentResponse> {
    await this.usersService.hasAccountAccess(tokenData.sub, accountId);

    const document = await this.documentsService.getAccountDocument({ accountId, id: documentId });

    return await this.documentFactory.createResponse(document);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Delete document' })
  @ApiOkResponse({ type: ResultResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Delete(':documentId')
  @UserAuth()
  public async delete(
    @Param('accountId') accountId: IdType,
    @Param('documentId') documentId: IdType,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<ResultResponse> {
    await this.usersService.hasAccountAccess(tokenData.sub, accountId);

    const result = await this.documentsService.delete({ accountId, ids: [documentId] });

    return new ResultResponse({ message: `Deleted successfully ${result} document.` });
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Add tags to the document.' })
  @ApiBody({ type: DocumentTagsDto })
  @ApiOkResponse({ type: ResultResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Post(':documentId/tags')
  @UserAuth()
  public async addTags(
    @Param('accountId') accountId: IdType,
    @Param('documentId') documentId: IdType,
    @Body() body: DocumentTagsDto,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<ResultResponse> {
    await this.usersService.hasAccountAccess(tokenData.sub, accountId);

    const result = await this.documentsService.addTags({ accountId, documentId, tagIds: body.tagIds });

    return new ResultResponse({ message: `Added ${result} tags successfully.` });
  }
}
