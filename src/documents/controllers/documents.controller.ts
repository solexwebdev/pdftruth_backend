import {
  BadRequestException,
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
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentsService } from '@/documents/services/documents.service';
import { UserAuth } from '@/auth/decorators/user-auth.decorator';
import { UserToken } from '@/auth/decorators/user-token.decorator';
import { JwtTokenData } from '@/common/types/jwt-token-data.type';
import { BadRequestResponse } from '@/common/responses/bad-request.response';
import { UploadFile } from '@/common/decorators/upload-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdType } from '@/common/types/id.type';
import { DocumentsQueryDto } from '@/documents/dto/documents-query.dto';
import { UsersService } from '@/users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { DocumentResponse } from '@/documents/responses/document.response';
import { DocumentFactory } from '@/documents/factories/document.factory';
import { ResultResponse } from '@/common/responses/result.response';
import { DocumentsFactory } from '@/documents/factories/documents.factory';
import { PaginateMetaResponse } from '@/common/responses/paginate-meta.response';
import { DocumentsResponse } from '@/documents/responses/documents.response';

@ApiTags('Documents')
@Controller()
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
  @Post(':accountId/documents')
  @UserAuth()
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
  @Get(':accountId/documents')
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
  @Get(':accountId/documents/:id')
  @UserAuth()
  public async get(
    @Param('accountId') accountId: IdType,
    @Param('id') id: IdType,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<DocumentResponse> {
    await this.usersService.hasAccountAccess(tokenData.sub, accountId);

    const document = await this.documentsService.getAccountDocument({ accountId, id });

    return await this.documentFactory.createResponse(document);
  }

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Delete document' })
  @ApiOkResponse({ type: ResultResponse })
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @Delete(':accountId/documents/:id')
  @UserAuth()
  public async delete(
    @Param('accountId') accountId: IdType,
    @Param('id') id: IdType,
    @UserToken() tokenData: JwtTokenData,
  ): Promise<ResultResponse> {
    await this.usersService.hasAccountAccess(tokenData.sub, accountId);

    const result = await this.documentsService.delete({ accountId, ids: [id] });

    return new ResultResponse({ message: `Deleted successfully ${result} document.` });
  }
}
