import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Tag } from '@/domains/tags/entity/tag.entity';
import { ArrayTagsResponse } from '@/domains/tags/responses/array-tags.response';
import { Injectable } from '@nestjs/common';
import { TagFactory } from '@/domains/tags/factories/tag.factory';

@Injectable()
export class ArrayTagsFactory extends BaseResponseFactory<Tag[], ArrayTagsResponse> {
  constructor(private readonly tagFactory: TagFactory) {
    super();
  }

  public createResponse(entity: Tag[], options?: Record<string, undefined> | undefined): ArrayTagsResponse {
    return new ArrayTagsResponse({
      items: entity.map((el: Tag) => this.tagFactory.createResponse(el)),
    });
  }
}
