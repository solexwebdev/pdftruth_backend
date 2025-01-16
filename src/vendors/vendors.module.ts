import { Module } from '@nestjs/common';
import { S3ClientService } from '@/vendors/services/s3-client.service';

@Module({
  providers: [S3ClientService],
  exports: [S3ClientService],
})
export class VendorsModule {}
