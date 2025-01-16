import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentsService } from '@/documents/services/documents.service';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @ApiOperation({ summary: 'Upload PDF document' })
  @Post()
  public async save(): Promise<any> {}
}
