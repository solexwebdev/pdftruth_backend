import { Module } from '@nestjs/common';
import { TagsService } from '@/domains/tags/services/tags.service';
import { TagsController } from '@/domains/tags/controllers/tags.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tag } from '@/domains/tags/entity/tag.entity';
import { UsersModule } from '@/domains/users/users.module';
import { AccountsModule } from '@/domains/accounts/accounts.module';
import { TagsFactory } from '@/domains/tags/factories/tags.factory';
import { TagFactory } from '@/domains/tags/factories/tag.factory';
import { ArrayTagsFactory } from '@/domains/tags/factories/array-tags.factory';

@Module({
  imports: [MikroOrmModule.forFeature([Tag]), UsersModule, AccountsModule],
  providers: [TagsService, TagFactory, TagsFactory, ArrayTagsFactory],
  exports: [TagsService, TagFactory],
  controllers: [TagsController],
})
export class TagsModule {}
