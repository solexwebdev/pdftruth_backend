import { Module } from '@nestjs/common';
import { TagsService } from '@/domains/tags/services/tags.service';
import { TagsController } from '@/domains/tags/controllers/tags.controller';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
