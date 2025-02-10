import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from '@/domains/tags/entity/tag.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Account } from '@/domains/accounts/entities/account.entity';
import { IdType } from '@/common/types/id.type';
import { TagsQueryDto } from '@/domains/tags/dto/tags-query.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
    private readonly em: EntityManager,
  ) {}

  public async saveMany(payload: { account: Account; names: string[] }): Promise<Tag[]> {
    const preparedNames: string[] = [...new Set(payload.names.flatMap((name) => name.trim().toLowerCase().split(' ')))];

    const existingTags = await this.tagRepository.find({
      name: { $in: preparedNames },
    });
    const accountTags = await this.tagRepository.find({
      accounts: { id: payload.account.id },
    });
    const existingTagNames = existingTags.map((tag) => tag.name);
    const newTagNames = preparedNames.filter((name) => !existingTagNames.includes(name));
    const newTags = await Promise.all(newTagNames.map((name) => this.em.upsert(Tag, new Tag({ name }))));

    const addTags = [...existingTags, ...newTags].filter(
      (tag) => !accountTags.find((accTag) => accTag.name === tag.name),
    );

    if (addTags.length > 0) {
      payload.account.tags.add(addTags);
    }

    await this.em.flush();

    return [...existingTags, ...newTags];
  }

  public async fetch(payload: { accountId: IdType; query: TagsQueryDto }): Promise<[Tag[], number]> {
    const qb = this.tagRepository
      .createQueryBuilder()
      .where({
        accounts: { id: payload.accountId },
      })
      .leftJoin('accounts', 'accounts')
      .orderBy({ name: payload.query.order })
      .limit(payload.query.take)
      .offset(payload.query.skip);

    if (payload.query?.search?.length) {
      qb.andWhere({ name: { $ilike: `%${payload.query.search}%` } });
    }

    return await qb.getResultAndCount();
  }

  public async deleteForAccount(account: Account, id: IdType): Promise<void> {
    const tag = await this.tagRepository.findOneOrFail(
      {
        id,
        accounts: { id: account.id },
      },
      { populate: ['accounts'] },
    );
    tag.accounts.remove(account);

    await this.em.flush();
  }

  public async findByIds(payload: { accountId: string; ids: IdType[] }): Promise<Tag[]> {
    return await this.tagRepository.find({ id: { $in: payload.ids }, accounts: { id: payload.accountId } });
  }

  public async bulkDeleteForAccount(account: Account, ids: IdType[]): Promise<void> {
    const tags = await this.tagRepository.find({
      id: { $in: ids },
      accounts: { id: account.id },
    });
    account.tags.remove(tags);

    await this.em.flush();
  }
}
