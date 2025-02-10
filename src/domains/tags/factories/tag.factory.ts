import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Tag } from '@/domains/tags/entity/tag.entity';
import { TagResponse } from '@/domains/tags/responses/tag.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagFactory extends BaseResponseFactory<Tag, TagResponse> {
  public createResponse(
    entity: Tag,
    options?: Record<string, undefined> | undefined,
  ): TagResponse | Promise<TagResponse> {
    return new TagResponse({
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
    });
  }
}
