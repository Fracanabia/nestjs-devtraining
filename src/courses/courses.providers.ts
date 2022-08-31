import { DataSource } from 'typeorm';
import { Course } from './entity/course.entity';
import { Tag } from './entity/tag.entity';

export const coursesProviders = [
  {
    provide: 'COURSES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TAGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: ['DATA_SOURCE'],
  },
];
