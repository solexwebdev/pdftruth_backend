import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
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

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @ApiExcludeEndpoint(process.env.API_DOCUMENTATION_INCLUSION == 'true')
  @ApiOperation({ summary: 'Upload PDF document' })
  @ApiOkResponse({})
  @ApiForbiddenResponse({ description: 'UNAUTHORIZED_REQUEST' })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiConsumes('multipart/form-data')
  @UploadFile('file')
  @UseInterceptors(FileInterceptor('file'))
  @Post(':accountId')
  @UserAuth()
  public async save(
    @Param('accountId') accountId: IdType,
    @UserToken() tokenData: JwtTokenData,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: '.(pdf)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    const result = await this.documentsService.create({ accountId, file, userId: tokenData.sub });

    return result;
  }
}
