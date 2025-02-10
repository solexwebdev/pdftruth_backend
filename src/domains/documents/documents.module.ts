import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Document } from '@/domains/documents/entities/document.entity';
import { StorageModule } from '@/domains/storage/storage.module';
import { UsersModule } from '@/domains/users/users.module';
import { DocumentFactory } from '@/domains/documents/factories/document.factory';
import { DocumentsFactory } from '@/domains/documents/factories/documents.factory';
import { TagsModule } from '@/domains/tags/tags.module';

@Module({
  imports: [MikroOrmModule.forFeature([Document]), StorageModule, UsersModule, TagsModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentFactory, DocumentsFactory],
  exports: [DocumentsService],
})
export class DocumentsModule {}
