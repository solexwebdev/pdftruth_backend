import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from '@/app/controllers/app.controller';
import { AppService } from '@/app/services/app.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvValidationSchema } from '@/common/utils/env-validation-schema.util';
import { microormFactory } from '@/common/factories/microorm.factory';
import { UsersModule } from '@/domains/users/users.module';
import { AccountsModule } from '@/domains/accounts/accounts.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { CommonModule } from '@/common/common.module';
import { MikroORM } from '@mikro-orm/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { VendorsModule } from '@/vendors/vendors.module';
import { StorageModule } from '@/domains/storage/storage.module';
import { DocumentsModule } from '@/domains/documents/documents.module';
import { EnquiriesModule } from '@/domains/enquiries/enquiries.module';
import { TagsModule } from '@/domains/tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: microormFactory,
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    CommonModule,
    UsersModule,
    AccountsModule,
    VendorsModule,
    StorageModule,
    DocumentsModule,
    EnquiriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
