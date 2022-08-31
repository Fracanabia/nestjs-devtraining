import { DataSource } from 'typeorm';
import { CreateCoursesTable1661801550530 } from './migrations/1661801550530-CreateCoursesTable';
import { CreateTagsTable1661801896584 } from './migrations/1661801896584-CreateTagsTable';
import { CreateCoursesTagsTable1661804595076 } from './migrations/1661804595076-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1661804946638 } from './migrations/1661804946638-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1661805412434 } from './migrations/1661805412434-AddTagsIdToCoursesTagsTable';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'cursonestjs',
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: false,
  migrations: [
    CreateCoursesTable1661801550530,
    CreateTagsTable1661801896584,
    CreateCoursesTagsTable1661804595076,
    AddCoursesIdToCoursesTagsTable1661804946638,
    AddTagsIdToCoursesTagsTable1661805412434,
  ],
});
