import { Migration } from '@mikro-orm/migrations';

export class Migration20250210083923_add_tags_table extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "tags" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, constraint "tags_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "tags_accounts" ("tag_id" uuid not null, "account_id" uuid not null, constraint "tags_accounts_pkey" primary key ("tag_id", "account_id"));`,
    );

    this.addSql(
      `alter table "tags_accounts" add constraint "tags_accounts_tag_id_foreign" foreign key ("tag_id") references "tags" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "tags_accounts" add constraint "tags_accounts_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tags_accounts" drop constraint "tags_accounts_tag_id_foreign";`);

    this.addSql(`drop table if exists "tags" cascade;`);

    this.addSql(`drop table if exists "tags_accounts" cascade;`);
  }
}
