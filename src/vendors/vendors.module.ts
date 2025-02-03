import { Module } from '@nestjs/common';
import { S3ClientService } from '@/vendors/services/s3-client.service';
import { MinioService } from '@/vendors/services/minio.service';

@Module({
  providers: [S3ClientService, MinioService],
  exports: [S3ClientService, MinioService],
})
export class VendorsModule {}
