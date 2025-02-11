import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Enquiry } from '@/domains/enquiries/entities/enquiry.entity';
import { EnquiryResponse } from '@/domains/enquiries/responses/enquiry.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnquiryFactory extends BaseResponseFactory<Enquiry, EnquiryResponse> {
  public createResponse(
    entity: Enquiry,
    options?: Record<string, undefined> | undefined,
  ): EnquiryResponse | Promise<EnquiryResponse> {
    return new EnquiryResponse({
      id: entity.id,
      type: entity.type,
      result: entity.result,
      createdAt: entity.createdAt,
    });
  }
}
