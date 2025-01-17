import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Document } from '@/documents/entities/document.entity';
import { StorageModule } from '@/storage/storage.module';

@Module({
  imports: [MikroOrmModule.forFeature([Document]), StorageModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
