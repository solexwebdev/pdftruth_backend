import { Migration } from '@mikro-orm/migrations';

export class Migration20250108150701_create_accounts_and_memberships_tables extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "accounts" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) null, constraint "accounts_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "memberships" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "is_default" boolean not null default false, "user_id" varchar(255) not null, "account_id" varchar(255) not null, "role_id" varchar(255) not null, constraint "memberships_pkey" primary key ("id"));`,
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

  override async down(): Promise<void> {
    this.addSql(
      `alter table "memberships" drop constraint "memberships_account_id_foreign";`,
    );

    this.addSql(`drop table if exists "accounts" cascade;`);

    this.addSql(`drop table if exists "memberships" cascade;`);
  }
}
