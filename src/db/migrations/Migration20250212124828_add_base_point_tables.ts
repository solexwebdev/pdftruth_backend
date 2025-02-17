import { Migration } from '@mikro-orm/migrations';

export class Migration20250212124828_add_base_point_tables extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "points" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "balance" int not null default 0, "account_id" uuid not null, constraint "points_pkey" primary key ("id"));`);
    this.addSql(`alter table "points" add constraint "points_account_id_unique" unique ("account_id");`);

    this.addSql(`create table "point_pricing_rules" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "max_amount" int not null default 0, "price_per_point" int not null default 0, constraint "point_pricing_rules_pkey" primary key ("id"));`);

    this.addSql(`create table "point_transactions" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "account_id" uuid not null, "amount" int not null default 0, "transaction_type" text check ("transaction_type" in ('purchase', 'spend', 'bonus', 'refund')) not null, "description" text null, constraint "point_transactions_pkey" primary key ("id"));`);

    this.addSql(`alter table "points" add constraint "points_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "point_transactions" add constraint "point_transactions_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "points" cascade;`);

    this.addSql(`drop table if exists "point_pricing_rules" cascade;`);

    this.addSql(`drop table if exists "point_transactions" cascade;`);
  }

}
