import { Migration } from '@mikro-orm/migrations';

export class Migration20250107150815_add_password_field_to_users_table extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" add column "password" varchar(255) not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "password";`);
  }
}
