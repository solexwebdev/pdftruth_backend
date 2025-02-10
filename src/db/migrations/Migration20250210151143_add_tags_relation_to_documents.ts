import { Migration } from '@mikro-orm/migrations';

export class Migration20250210151143_add_tags_relation_to_documents extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "tags_documents" ("tag_id" uuid not null, "document_id" uuid not null, constraint "tags_documents_pkey" primary key ("tag_id", "document_id"));`,
    );

    this.addSql(
      `alter table "tags_documents" add constraint "tags_documents_tag_id_foreign" foreign key ("tag_id") references "tags" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "tags_documents" add constraint "tags_documents_document_id_foreign" foreign key ("document_id") references "documents" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(`create index "tags_name_index" on "tags" ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "tags_documents" cascade;`);

    this.addSql(`drop index "tags_name_index";`);
  }
}
