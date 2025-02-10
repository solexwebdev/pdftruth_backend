import { Document } from '@/domains/documents/entities/document.entity';

export interface ICreateDocument extends Pick<Document, any> {
  name: string;
}
