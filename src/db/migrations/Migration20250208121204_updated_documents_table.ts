import { Migration } from '@mikro-orm/migrations';

export class Migration20250208121204_updated_documents_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "documents" drop constraint "documents_file_id_foreign";`);

    this.addSql(`alter table "documents" alter column "file_id" drop default;`);
    this.addSql(`alter table "documents" alter column "file_id" type uuid using ("file_id"::text::uuid);`);
    this.addSql(`alter table "documents" alter column "file_id" drop not null;`);
    this.addSql(`alter table "documents" add constraint "documents_file_id_foreign" foreign key ("file_id") references "storage-items" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "documents" drop constraint "documents_file_id_foreign";`);

    this.addSql(`alter table "documents" alter column "file_id" drop default;`);
    this.addSql(`alter table "documents" alter column "file_id" type uuid using ("file_id"::text::uuid);`);
    this.addSql(`alter table "documents" alter column "file_id" set not null;`);
    this.addSql(`alter table "documents" add constraint "documents_file_id_foreign" foreign key ("file_id") references "storage-items" ("id") on update cascade;`);
  }

}
