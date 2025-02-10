import { Module } from '@nestjs/common';
import { EnquiriesService } from './services/enquiries.service';
import { DocumentCreatedListener } from '@/domains/enquiries/listeners/document-created.listener';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Enquiry } from '@/domains/enquiries/entities/enquiry.entity';
import { EnquiryHashHandler } from '@/domains/enquiries/handlers/enquiry-hash.handler';
import { EnquiryMetadataHandler } from '@/domains/enquiries/handlers/enquiry-metadata.handler';
import { EnquiryValidPdfaHandler } from '@/domains/enquiries/handlers/enquiry-valid-pdfa.handler';
import { DocumentsModule } from '@/domains/documents/documents.module';
import { CommonModule } from '@/common/common.module';
import { VendorsModule } from '@/vendors/vendors.module';

@Module({
  imports: [MikroOrmModule.forFeature([Enquiry]), CommonModule, DocumentsModule, VendorsModule],
  providers: [
    EnquiriesService,
    DocumentCreatedListener,
    EnquiryHashHandler,
    EnquiryMetadataHandler,
    EnquiryValidPdfaHandler,
  ],
})
export class EnquiriesModule {}
