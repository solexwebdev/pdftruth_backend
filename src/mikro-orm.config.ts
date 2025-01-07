import { microormFactory } from '@/common/factories/microorm.factory';
import { ConfigService } from '@nestjs/config';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

const configService = new ConfigService();
const connectionConfig = microormFactory(configService);
export default defineConfig({
  ...connectionConfig,
  extensions: [Migrator, SeedManager],
  migrations: {
    tableName: 'migrations',
    path: `./dist/db/migrations`,
    pathTs: `./src/db/migrations`,
    glob: '!(*.d).{js,ts}',
    transactional: true,
    allOrNothing: true,
    emit: 'ts',
  },
  seeder: {
    path: `./dist/db/seeders`,
    pathTs: `./src/db/seeders`,
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
});
