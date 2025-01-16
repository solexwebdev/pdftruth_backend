import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { Readable } from 'stream';
import { UrlExpiryEnum } from '@/vendors/enums/url-expiry.enum';
import { join } from 'path';
import { S3_SETTINGS_CONFIG } from '@/vendors/consts/s3-settings.const';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IUploadObjectData } from '@/vendors/interfaces/upload-object-data.interface';
import { BucketStoragePathEnum } from '@/storage/enums/bucket-storage-path.enum';

@Injectable()
export class S3ClientService {
  private readonly client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get<string>(ConfigEnv.AWS_S3_KEY_ID) as string,
      secretAccessKey: this.configService.get<string>(ConfigEnv.AWS_S3_SECRET) as string,
    },
    region: this.configService.get<string>(ConfigEnv.AWS_S3_REGION),
  });

  constructor(private readonly configService: ConfigService) {}

  public async getStorageItemUrl(payload: {
    storedFileName: string;
    storagePath: string;
    expiryType?: UrlExpiryEnum;
  }): Promise<string | null> {
    const expiryType = payload.expiryType || UrlExpiryEnum.Maximum;

    const command = new GetObjectCommand({
      Bucket: this.configService.get<string>(ConfigEnv.AWS_S3_BUCKET),
      Key: join(payload.storagePath, payload.storedFileName),
    });

    return await getSignedUrl(this.client, command, { expiresIn: S3_SETTINGS_CONFIG[expiryType] });
  }

  public async getFileStream(key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get<string>(ConfigEnv.AWS_S3_BUCKET),
      Key: key,
    });

    const response = await this.client.send(command);

    if (response.Body instanceof Readable) return response.Body;

    throw new Error('The received body is not a readable stream.');
  }

  public async uploadFile(payload: IUploadObjectData): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.configService.get(ConfigEnv.AWS_S3_BUCKET),
        Key: this.toObjectKey({ storagePath: payload.storagePath, fileName: payload.fileName }),
        Body: payload.fileBuffer,
        ...(payload.mimeType && { ContentType: payload.mimeType }),
      }),
    );
  }

  public async remove(payload: { path: BucketStoragePathEnum; fileName: string }): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get(ConfigEnv.AWS_S3_BUCKET),
        Key: this.toObjectKey({ storagePath: payload.path, fileName: payload.fileName }),
      }),
    );
  }

  public async removeMultiple(items: { path: BucketStoragePathEnum; fileName: string }[]): Promise<void> {
    await this.client.send(
      new DeleteObjectsCommand({
        Bucket: this.configService.get(ConfigEnv.AWS_S3_BUCKET),
        Delete: {
          Objects: items.map((item) => ({
            Key: this.toObjectKey({ storagePath: item.path, fileName: item.fileName }),
          })),
        },
      }),
    );
  }

  private toObjectKey(params: { storagePath: BucketStoragePathEnum; fileName: string }): string {
    return params.storagePath + params.storagePath;
  }
}
