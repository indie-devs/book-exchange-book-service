## Install

- Require NodeJS v16 and yarn v1

## Run the application

- Create `.env.development` in root directory and define all variables listed in `.env.example`
- Run `start:db` to start Postgres
- Run `yarn` to install all dependencies.
- Run `yarn prisma:client` to generate Prisma Artifacts.
- Finally run `yarn start:dev`.

## Available Scripts

### `yarn prisma:generate "<migrate name>"`

Sync prisma schema to database schema. Make schema change in `schema.prisma` file and run this command.

### `yarn prisma:client`

Generate artifacts (e.g. Prisma Client)

### `yarn prisma:deploy`

Applies all pending migrations.

### `yarn prisma:pull`

Adds Prisma models to Prisma schema that reflect the current database schema.
