import { AbstractCORHandler } from '@/domains/enquiries/handlers/abstract-COR.handler';
import { Injectable } from '@nestjs/common';
import { IEnquiryPayload } from '@/domains/enquiries/interfaces/enqiury-payload.interface';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { EnquiriesService } from '@/domains/enquiries/services/enquiries.service';
import { ConfigService } from '@nestjs/config';
import { unlink, writeFile } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import { ICreateEnquiry } from '@/domains/enquiries/interfaces/create-enquiry.interface';
import { EnquiryType } from '@/domains/enquiries/enums/enquiry-type.enum';
import { IEnquiryPdfa } from '@/domains/enquiries/interfaces/enquiry-pdfa.interface';

const execPromise = promisify(exec);

@Injectable()
export class EnquiryValidPdfaHandler extends AbstractCORHandler {
  constructor(
    private readonly enquiriesService: EnquiriesService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async handle(request: IEnquiryPayload): Promise<void> {
    const isActive = this.configService.get<boolean>(ConfigEnv.ENQUIRY_VALID_PDFA_ENABLED);

    if (isActive) {
      const result = await this.validatePDFAUsingGhostscript(request.fileBuffer);

      const enquiryData: ICreateEnquiry = {
        document: { id: request.documentId },
        type: EnquiryType.PDFA,
        result: {
          ...result,
        },
      };

      await this.enquiriesService.save(enquiryData);
    }

    return await super.handle(request);
  }

  private async validatePDFAUsingGhostscript(pdfBuffer: Buffer): Promise<IEnquiryPdfa> {
    const uint8Array = new Uint8Array(pdfBuffer);
    const tempFilePath = path.join('/tmp', `temp_pdf_${Date.now()}.pdf`);

    try {
      await writeFile(tempFilePath, uint8Array);

      const { stdout, stderr } = await execPromise(
        `gs -dPDFA -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sOutputFile=/dev/null -dPDFACompatibilityPolicy=1 ${tempFilePath}`,
      );

      return {
        isValid: !stderr,
        error: stderr,
      };
    } catch (error) {
      throw new Error(`Error checking PDF signature: ${error.message}`);
    } finally {
      await unlink(tempFilePath).catch(() => {});
    }
  }
}
