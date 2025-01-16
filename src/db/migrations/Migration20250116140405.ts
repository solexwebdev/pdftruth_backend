import { Migration } from '@mikro-orm/migrations';

export class Migration20250116140405 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "accounts" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) null, constraint "accounts_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "roles" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in ('super_admin', 'owner', 'manager', 'viewer')) not null, constraint "roles_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "storage-items" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "stored_file_name" text not null, "original_file_name" text not null, "storage_path" text not null, "size" integer not null default 0, "mime_type" text not null, constraint "storage-items_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "documents" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null default 'document', "account_id" uuid not null, "file_id" uuid not null, constraint "documents_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "documents" add constraint "documents_file_id_unique" unique ("file_id");`);

    this.addSql(
      `create table "users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) null, "nickname" varchar(255) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "email_confirmation_token" varchar(255) null, "status" text check ("status" in ('active', 'inactive')) not null default 'active', "deleted_at" timestamptz null, constraint "users_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
    this.addSql(`create index "users_deleted_at_index" on "users" ("deleted_at");`);

    this.addSql(
      `create table "socials" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "sub" varchar(255) not null, "vendor" text check ("vendor" in ('google', 'apple')) not null, "user_id" uuid not null, constraint "socials_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "memberships" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "is_default" boolean not null default false, "user_id" uuid not null, "account_id" uuid not null, "role_id" uuid not null, constraint "memberships_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "documents" add constraint "documents_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "documents" add constraint "documents_file_id_foreign" foreign key ("file_id") references "storage-items" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "socials" add constraint "socials_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );

    this.addSql(
      `alter table "memberships" add constraint "memberships_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "memberships" add constraint "memberships_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "memberships" add constraint "memberships_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;`,
    );
  }
}
