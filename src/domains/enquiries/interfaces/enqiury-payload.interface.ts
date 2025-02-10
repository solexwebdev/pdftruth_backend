import { IdType } from '@/common/types/id.type';

export interface IEnquiryPayload {
  documentId: IdType;
  fileBuffer: Buffer;
}
