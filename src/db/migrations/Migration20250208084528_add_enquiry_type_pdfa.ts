import { Migration } from '@mikro-orm/migrations';

export class Migration20250208084528_add_enquiry_type_pdfa extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "enquiries" drop constraint if exists "enquiries_type_check";`);

    this.addSql(
      `alter table "enquiries" add constraint "enquiries_type_check" check("type" in ('hash', 'metadata', 'signature', 'pdfa'));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "enquiries" drop constraint if exists "enquiries_type_check";`);

    this.addSql(
      `alter table "enquiries" add constraint "enquiries_type_check" check("type" in ('metadata', 'hash', 'signature'));`,
    );
  }
}
