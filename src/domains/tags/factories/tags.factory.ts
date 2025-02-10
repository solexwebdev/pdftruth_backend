import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Tag } from '@/domains/tags/entity/tag.entity';
import { TagsResponse } from '@/domains/tags/responses/tags.response';
import { Injectable } from '@nestjs/common';
import { TagFactory } from '@/domains/tags/factories/tag.factory';

@Injectable()
export class TagsFactory extends BaseResponseFactory<Tag[], TagsResponse> {
  constructor(private readonly tagFactory: TagFactory) {
    super();
  }

  public createResponse(entity: Tag[], options: Record<string, undefined>): Promise<TagsResponse> | TagsResponse {
    return new TagsResponse({
      data: entity.map((el: Tag) => this.tagFactory.createResponse(el)),
      meta: options.meta,
    });
  }
}
