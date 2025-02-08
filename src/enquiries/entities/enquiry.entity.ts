import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Document } from '@/documents/entities/document.entity';
import { EnquiryType } from '@/enquiries/enums/enquiry-type.enum';
import { IEnquiryHash } from '@/enquiries/interfaces/enquiry-hash.interface';
import { ICreateEnquiry } from '@/enquiries/interfaces/create-enquiry.interface';
import { IEnquiryMetaData } from '@/enquiries/interfaces/enquiry-metadata.interface';
import { IEnquirySignature } from '@/enquiries/interfaces/enquiry-signature.interface';
import { IEnquiryPdfa } from '@/enquiries/interfaces/enquiry-pdfa.interface';

@Entity({ tableName: 'enquiries' })
export class Enquiry extends CustomBaseEntity {
  @ManyToOne(() => Document, { nullable: false, deleteRule: 'cascade' })
  document!: Document;

  @Enum(() => EnquiryType)
  type!: EnquiryType;

  @Property({ type: 'jsonb', nullable: true })
  result?: IEnquiryHash | IEnquiryMetaData | IEnquirySignature | IEnquiryPdfa | null;

  constructor(data: ICreateEnquiry) {
    super();
    Object.assign(this, data);
  }
}
