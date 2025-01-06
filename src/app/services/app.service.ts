import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return `Hello everybody? Current environment is ${this.configService.get<string>(ConfigEnv.NODE_ENV)}!`;
  }
}
