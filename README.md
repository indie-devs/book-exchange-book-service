## Install

- Require NodeJS version v16 and yarn v1

## Run the application

- Create `.env.development` in root directory. Set your `PORT` variable
- Paste your database URL to `DATABASE_URL` in `.env.development` file `DATABASE_URL="postgresql://<user>:<pass>@localhost:5432/books?schema=public"`
- Run `start:db` to start Postgres
- Run `yarn i` to install all dependencies.
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
