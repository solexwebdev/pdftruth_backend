import { Module } from '@nestjs/common';
import { CommonService } from './services/common.service';
import { CryptoUtilService } from '@/common/services/crypto-util.service';

@Module({
  providers: [CommonService, CryptoUtilService],
  exports: [CryptoUtilService],
})
export class CommonModule {}
