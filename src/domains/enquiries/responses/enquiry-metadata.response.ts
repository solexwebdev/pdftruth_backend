import {
  IEnquiryAnnotation,
  IEnquiryMetaData,
  IEnquiryPageInfo,
} from '@/domains/enquiries/interfaces/enquiry-metadata.interface';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnquiryAnnotationResponse implements IEnquiryAnnotation {
  @ResponseProperty({ cls: Boolean })
  annotationFlags: boolean;

  @ResponseProperty({ cls: String })
  modificationDate: string;

  @ResponseProperty({ cls: String })
  subtype: string;
}

export class EnquiryPageInfoResponse implements IEnquiryPageInfo {
  @ResponseProperty({ cls: Boolean })
  hasContentItems: boolean;

  @ResponseProperty({ cls: EnquiryAnnotationResponse, each: true })
  annotations: EnquiryAnnotationResponse[];
}

export class EnquiryMetaDataResponse implements IEnquiryMetaData {
  @ApiPropertyOptional({
    description: 'Metadata as key-value',
    type: Object,
    additionalProperties: true,
    nullable: true,
  })
  metadata: Record<string, undefined> | null;

  @ApiProperty({
    description: 'Additional information as key-value',
    type: Object,
    additionalProperties: true,
  })
  info: Record<string, undefined> | object;

  @ApiProperty({
    description: 'Request page information',
    type: [EnquiryPageInfoResponse],
  })
  pagesInfo: EnquiryPageInfoResponse[];
}
