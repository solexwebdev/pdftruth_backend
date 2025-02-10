import { WithPaginatedResponse } from '@/common/mixins/with-pagination.mixin';
import { TagResponse } from '@/domains/tags/responses/tag.response';

export class TagsResponse extends WithPaginatedResponse(TagResponse) {}
