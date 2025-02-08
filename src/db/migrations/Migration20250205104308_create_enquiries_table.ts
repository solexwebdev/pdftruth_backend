import { Migration } from '@mikro-orm/migrations';

export class Migration20250205104308_create_enquiries_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "enquiries" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "document_id" uuid not null, "type" text check ("type" in ('metadata', 'hash', 'signature')) not null, "result" jsonb null, constraint "enquiries_pkey" primary key ("id"));`);

    this.addSql(`alter table "enquiries" add constraint "enquiries_document_id_foreign" foreign key ("document_id") references "documents" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "enquiries" cascade;`);
  }

}
