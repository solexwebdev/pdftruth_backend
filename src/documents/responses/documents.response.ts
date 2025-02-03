import { WithPaginatedResponse } from '@/common/mixins/with-pagination.mixin';
import { DocumentResponse } from '@/documents/responses/document.response';

export class DocumentsResponse extends WithPaginatedResponse(DocumentResponse) {}
