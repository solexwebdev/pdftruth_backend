import { Document } from '@/documents/entities/document.entity';

export interface ICreateDocument extends Pick<Document, any> {
  name: string;
}
