import { IEnquiryHash } from '@/domains/enquiries/interfaces/enquiry-hash.interface';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class EnquiryHashResponse implements IEnquiryHash {
  @ResponseProperty({ cls: String })
  hash: string;
}
