import { WithPaginatedResponse } from '@/common/mixins/with-pagination.mixin';
import { DocumentResponse } from '@/domains/documents/responses/document.response';

export class DocumentsResponse extends WithPaginatedResponse(DocumentResponse) {}
