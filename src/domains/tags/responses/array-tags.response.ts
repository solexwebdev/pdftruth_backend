import { withArrayResponse } from '@/common/mixins/with-array.response.mixin';
import { TagResponse } from '@/domains/tags/responses/tag.response';

export class ArrayTagsResponse extends withArrayResponse(TagResponse) {}
