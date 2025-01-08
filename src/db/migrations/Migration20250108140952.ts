import { Migration } from '@mikro-orm/migrations';

export class Migration20250108140952 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "roles" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in ('super_admin', 'owner', 'manager', 'viewer')) not null, constraint "roles_pkey" primary key ("id"));`);

    this.addSql(`create table "users" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) null, "nickname" varchar(255) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "is_email_confirmed" boolean not null default false, "status" text check ("status" in ('active', 'inactive')) not null default 'active', "deleted_at" timestamptz null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
    this.addSql(`create index "users_deleted_at_index" on "users" ("deleted_at");`);

    this.addSql(`create table "socials" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "sub" varchar(255) not null, "vendor" text check ("vendor" in ('google', 'apple')) not null, "user_id" varchar(255) not null, constraint "socials_pkey" primary key ("id"));`);

    this.addSql(`alter table "socials" add constraint "socials_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;`);
  }

}
