import { AbstractCORHandler } from '@/domains/enquiries/handlers/abstract-COR.handler';
import { Injectable } from '@nestjs/common';
import { IEnquiryPayload } from '@/domains/enquiries/interfaces/enqiury-payload.interface';
import { EnquiriesService } from '@/domains/enquiries/services/enquiries.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { ICreateEnquiry } from '@/domains/enquiries/interfaces/create-enquiry.interface';
import { EnquiryType } from '@/domains/enquiries/enums/enquiry-type.enum';
import * as pdfjs from 'pdfjs-dist';
import { IEnquiryMetaData } from '@/domains/enquiries/interfaces/enquiry-metadata.interface';

@Injectable()
export class EnquiryMetadataHandler extends AbstractCORHandler {
  constructor(
    private readonly enquiriesService: EnquiriesService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async handle(request: IEnquiryPayload): Promise<void> {
    const isActive = this.configService.get<boolean>(ConfigEnv.ENQUIRY_METADATA_ENABLED);
    if (isActive) {
      const metadata = await this.analyzePdfStructure(request.fileBuffer);

      const enquiryData: ICreateEnquiry = {
        document: { id: request.documentId },
        type: EnquiryType.METADATA,
        result: {
          ...metadata,
        },
      };

      await this.enquiriesService.save(enquiryData);
    }

    return await super.handle(request);
  }

  private async analyzePdfStructure(pdfBuffer: Buffer): Promise<any> {
    const uint8Array = new Uint8Array(pdfBuffer).buffer;
    const pdf = await pdfjs.getDocument({ data: uint8Array }).promise;
    const md = await pdf.getMetadata();

    const result: IEnquiryMetaData = {
      metadata: md.metadata?.getAll(),
      info: md.info,
      pagesInfo: [],
    };

    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const annotations = await page.getAnnotations();

      const pageInfo = {
        hasContentItems: false,
        annotations: annotations?.map((a) => ({
          annotationFlags: a.annotationFlags,
          modificationDate: a.modificationDate,
          subtype: a.subtype,
        })),
      };
      const content = await page.getTextContent();

      if (content.items.length) {
        pageInfo.hasContentItems = true;
      }

      result.pagesInfo.push(pageInfo);
    }

    return result;
  }
}
