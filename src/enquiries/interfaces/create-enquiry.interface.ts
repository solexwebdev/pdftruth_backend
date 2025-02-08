import { IdType } from '@/common/types/id.type';
import { EnquiryType } from '@/enquiries/enums/enquiry-type.enum';
import { IEnquiryHash } from '@/enquiries/interfaces/enquiry-hash.interface';
import { IEnquiryMetaData } from '@/enquiries/interfaces/enquiry-metadata.interface';
import { IEnquirySignature } from '@/enquiries/interfaces/enquiry-signature.interface';
import { IEnquiryPdfa } from '@/enquiries/interfaces/enquiry-pdfa.interface';

export interface ICreateEnquiry {
  document: { id: IdType };
  type: EnquiryType;
  result: IEnquiryHash | IEnquiryMetaData | IEnquirySignature | IEnquiryPdfa;
}
