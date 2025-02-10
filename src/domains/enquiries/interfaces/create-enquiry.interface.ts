import { IdType } from '@/common/types/id.type';
import { EnquiryType } from '@/domains/enquiries/enums/enquiry-type.enum';
import { IEnquiryHash } from '@/domains/enquiries/interfaces/enquiry-hash.interface';
import { IEnquiryMetaData } from '@/domains/enquiries/interfaces/enquiry-metadata.interface';
import { IEnquirySignature } from '@/domains/enquiries/interfaces/enquiry-signature.interface';
import { IEnquiryPdfa } from '@/domains/enquiries/interfaces/enquiry-pdfa.interface';

export interface ICreateEnquiry {
  document: { id: IdType };
  type: EnquiryType;
  result: IEnquiryHash | IEnquiryMetaData | IEnquirySignature | IEnquiryPdfa;
}
