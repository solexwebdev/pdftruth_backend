import { IdType } from '@/common/types/id.type';
import { EnquiryType } from '@/domains/enquiries/enums/enquiry-type.enum';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { EnquiryHashResponse } from '@/domains/enquiries/responses/enquiry-hash.response';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { EnquiryPdfaResponse } from '@/domains/enquiries/responses/enquiry-pdfa.response';
import { EnquiryMetaDataResponse } from '@/domains/enquiries/responses/enquiry-metadata.response';
import { BaseResponse } from '@/common/responses/base.response';

@ApiExtraModels(EnquiryHashResponse, EnquiryPdfaResponse, EnquiryMetaDataResponse)
export class EnquiryResponse extends BaseResponse {
  @ResponseProperty({ cls: String })
  id: IdType;

  @ResponseProperty({ enum: EnquiryType })
  type: EnquiryType;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(EnquiryHashResponse) },
      { $ref: getSchemaPath(EnquiryPdfaResponse) },
      { $ref: getSchemaPath(EnquiryMetaDataResponse) },
    ],
    nullable: true,
  })
  result?: EnquiryHashResponse | EnquiryPdfaResponse | EnquiryMetaDataResponse | null;

  @ResponseProperty({ cls: Date })
  createdAt!: Date;
}
