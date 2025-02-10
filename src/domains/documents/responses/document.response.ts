import { BaseResponse } from '@/common/responses/base.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { TagResponse } from '@/domains/tags/responses/tag.response';

export class DocumentResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  id: string;

  @ResponseProperty({ cls: String })
  name: string;

  @ResponseProperty({ cls: Number })
  size: number;

  @ResponseProperty({ cls: String, nullable: true })
  url: string | null;

  @ResponseProperty({ cls: TagResponse, each: true })
  tags: TagResponse[];

  @ResponseProperty({ cls: Date })
  createdAt: Date;
}
