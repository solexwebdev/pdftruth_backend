import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsService } from './services/documents.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Document } from '@/documents/entities/document.entity';
import { StorageModule } from '@/storage/storage.module';
import { UsersModule } from '@/users/users.module';
import { DocumentFactory } from '@/documents/factories/document.factory';
import { DocumentsFactory } from '@/documents/factories/documents.factory';

@Module({
  imports: [MikroOrmModule.forFeature([Document]), StorageModule, UsersModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentFactory, DocumentsFactory],
})
export class DocumentsModule {}
