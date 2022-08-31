## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Validators
*main.ts*
```ts
app.setGlobalPrefix('api');
app.useGlobalPipes(
  new ValidationPipe({
    // Retornar propriedades que existem no DTO
    whitelist: true,
    // Não permitir valores fora do DTO
    forbidNonWhitelisted: true,
    // Transformar os dados que chegam no tipo do DTO
    transform: true,
  })
);
await app.listen(3000);
```

```bash
# install packages
$ npm i class-validator class-transformer

# extends class to DTOs
$ npm i @nestjs/mapped-types
```

## TypeORM

```bash
# install packages typeorm with nest
$ npm i typeorm@0.2.45 @nestjs/typeorm pg

# update typeorm
$ npm i typeorm@0.3.7
```
 *app.module*
**TYPEORM 0.2.x**
```ts
// example configuration DB postgres
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',//or verify config docker
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'postgres', //or verify config docker
      autoLoadEntities: true, // Only environment developer
      synchronize: true, // Only environment developer
    }),
  ]
})
```

 *app.module*
**TYPEORM 0.3.x**
```ts
// example configuration DB postgres
@Module({
  imports: [DatabaseModule],
})
```

## Docker - Manual

```bash
# install image docker with postgres
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

## Migrations

```js
// example configuration ormconfig.js
module.exports = {
  type: 'postgres',
  host: 'localhost', //or verify config docker
  port: '5432',
  username: 'postgres',
  password: 'docker',
  database: 'postgres', //or verify config docker
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

```
```js
// example configuration ormconfig.js with docker-compose
module.exports = {
  type: 'postgres',
  host: 'db', // configuration docker-compose
  port: '5432',
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
```

**Create Migrations TypeORM 0.2.x**
```bash
# run example migration to refactor course
npx typeorm migration:create -n CourseRefactoring

# up
npx typeorm migration:run    

#down
npx typeorm migration:revert    
```

**Create Migrations TypeORM 0.3.x**
```bash
# run example migration to refactor course
npx typeorm migration:create src/migrations/CourseRefactoringTest

# up
npx typeorm migration:run -d dist/database.providers.js    

#down
npx typeorm migration:revert -d dist/database.providers.js
```

### Docker - Compose
**Application**
```dockerfile
# Install node version
FROM node:14.15.4-alpine3.12

# Add node
RUN apk add --no-cache bash

# Install Nestjs
RUN npm install -g @nestjs/cli

# Add user `node`
USER node

# Add workspace ${user}/app
WORKDIR /home/node/app
```

**Data Base**
```dockerfile
# Install postgres last version
FROM postgres

#  Add first user 1000 linux with name ${postgres}
RUN usermod -u 1000 postgres
```

**Entrypoint.sh TypeORM 0.2.x**
```sh
#!/bin/bash

# 1
npm install

# 2
npm run build

# 3
npx typeorm migration:run

# 4
npm run start:dev
```

**Entrypoint.sh TypeORM 0.3.x**
```sh
#!/bin/bash

# 1
npm install

# 2
npm run build

# 3
npx typeorm migration:run -d dist/database.providers.js

# 4
npm run start:dev
```

**docker-compose.yml**
```yml
version: '3'

services:
  # Application
  app:
    # Path Dockerfile
    build: .
    entrypoint: .docker/entrypoint.sh
    container_name: cursonestjs-app
    ports:
      - "3000:3000"
    volumes:
      - .:/home/node/app
    depends_on:
      - db
  
  # Database
  db:
    build: .docker/postgres
    container_name: cursonestjs-db
    restart: always
    # Terminal
    tty: true
    ports:
    - "5432:5432"
    volumes:
      - .docker/dbdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=cursonestjs

        # Database
  dbtest:
    build: .docker/postgres
    container_name: cursonestjs-dbtest
    restart: always
    # Terminal
    tty: true
    ports:
    - "5433:5432"
    volumes:
      - .docker/dbdatatest:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=testedb

  pgadmin:
    image: dpage/pgadmin4
    container_name: cursonestjs-pgamin
    tty: true
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=admin
    ports:
      - "8000:80"
    depends_on:
      - db
```

**Utils Commands**
```bash
# bash
docker-compose exec bash

# up
docker-compose up

# stop
docker-compose stop

# remove
docker-compose down
```

## UUID
```bash
npm install uuid
npm install -D @types/uuid
```
