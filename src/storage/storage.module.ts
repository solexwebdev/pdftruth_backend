import { Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { VendorsModule } from '@/vendors/vendors.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StorageItem } from '@/storage/entities/storage-item.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [StorageItem] }), VendorsModule],
  providers: [StorageService],
})
export class StorageModule {}
