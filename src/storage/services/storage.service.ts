import { Injectable } from '@nestjs/common';
import { S3ClientService } from '@/vendors/services/s3-client.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { StorageItem } from '@/storage/entities/storage-item.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { IdType } from '@/common/types/id.type';
import { IUploadStorageItem } from '@/storage/interfaces/upload-storage-item.interface';
import { BucketStoragePathEnum } from '@/storage/enums/bucket-storage-path.enum';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageItem)
    private readonly storageItemRepository: EntityRepository<StorageItem>,
    private readonly em: EntityManager,
    private readonly s3ClientService: S3ClientService,
  ) {}

  public async getStorageItemUrl(storageItem: StorageItem): Promise<string | null> {
    if (storageItem.storagePath && storageItem.storedFileName) {
      return await this.s3ClientService.getStorageItemUrl({
        storagePath: storageItem.storagePath,
        storedFileName: storageItem.storedFileName,
      });
    }

    return null;
  }

  public async upload(payload: IUploadStorageItem): Promise<StorageItem> {
    const sItem = new StorageItem(payload);

    await this.s3ClientService.uploadFile({
      storagePath: payload.storagePath,
      fileBuffer: payload.fileBuffer,
      fileName: payload.storedFileName,
      mimeType: payload.mimeType,
    });

    await this.em.persistAndFlush(sItem);

    return sItem;
  }

  public async delete(id: IdType): Promise<void> {
    const sItem = await this.storageItemRepository.findOneOrFail(id);

    await this.s3ClientService.remove({
      path: sItem.storagePath as BucketStoragePathEnum,
      fileName: sItem.storedFileName,
    });

    await this.storageItemRepository.nativeDelete({ id: sItem.id });
  }

  public async bulkDelete(ids: IdType[]): Promise<void> {
    const sItems = await this.storageItemRepository.find({ id: { $in: ids } });

    await this.s3ClientService.removeMultiple(
      sItems.map((el) => ({
        path: el.storagePath as BucketStoragePathEnum,
        fileName: el.storedFileName,
      })),
    );

    await this.storageItemRepository.nativeDelete({ id: ids });
  }
}
