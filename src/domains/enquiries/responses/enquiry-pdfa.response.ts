import { IEnquiryPdfa } from '@/domains/enquiries/interfaces/enquiry-pdfa.interface';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export class EnquiryPdfaResponse implements IEnquiryPdfa {
  @ResponseProperty({ cls: Boolean })
  isValid: boolean;

  @ResponseProperty({ cls: String })
  error: string;
}
