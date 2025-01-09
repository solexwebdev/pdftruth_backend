import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import CryptoJS from 'crypto-js';

@Injectable()
export class CryptoUtilService {
  constructor(private readonly configService: ConfigService) {}

  public generateUUID(size = 6): string {
    return nanoid(size);
  }

  public async generatePasswordHash(source: string): Promise<string> {
    const salt = this.configService.get<string>(ConfigEnv.PASSWORD_SALT);

    return bcrypt.hash(source, salt as string);
  }

  public async verifyPasswordHash(
    source: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(source, hash);
  }

  public encryptData(data: string): string {
    const encrypted = CryptoJS.RC4.encrypt(
      data,
      this.configService.get<string>(ConfigEnv.CRYPTO_JS_SECRET_KEY) as string,
    ).toString();

    return encrypted.replace(/\//g, '_');
  }

  public decryptData(data: string): string {
    const processedData = data.replace(/_/g, '/');
    const bytes = CryptoJS.RC4.decrypt(
      processedData,
      this.configService.get<string>(ConfigEnv.CRYPTO_JS_SECRET_KEY) as string,
    );

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
