import { AbstractCORHandler } from '@/enquiries/handlers/abstract-COR.handler';
import { Injectable } from '@nestjs/common';
import { IEnquiryPayload } from '@/enquiries/interfaces/enqiury-payload.interface';
import { CryptoUtilService } from '@/common/services/crypto-util.service';
import { EnquiriesService } from '@/enquiries/services/enquiries.service';
import { ICreateEnquiry } from '@/enquiries/interfaces/create-enquiry.interface';
import { EnquiryType } from '@/enquiries/enums/enquiry-type.enum';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';

@Injectable()
export class EnquiryHashHandler extends AbstractCORHandler {
  constructor(
    private readonly cryptoUtilService: CryptoUtilService,
    private readonly enquiriesService: EnquiriesService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async handle(request: IEnquiryPayload): Promise<void> {
    const isActive = this.configService.get<boolean>(ConfigEnv.ENQUIRY_HASH_ENABLED);
    if (isActive) {
      const hash = this.cryptoUtilService.getFileSha256Hash(request.fileBuffer);

      const enquiryData: ICreateEnquiry = {
        document: { id: request.documentId },
        type: EnquiryType.HASH,
        result: {
          hash,
        },
      };

      await this.enquiriesService.save(enquiryData);
    }

    return await super.handle(request);
  }
}
