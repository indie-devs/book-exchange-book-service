## Install

- Postgres
- Nestjs CLI

## Run the application

- Create `.env.development` in root directory. Set your `PORT` variable
- Paste your database URL to `DATABASE_URL` in `.env.development` file `DATABASE_URL="postgresql://<user>:<pass>@localhost:5432/books?schema=public"`
- Run `npm i` to install all dependencies.
- Edit your model change in `schema.prisma` file and run `npm run prisma:generate "<migrate name>"`. Artifacts like Prisma Client also be generated.
- Finally run `npm run start:dev`.

## Available Scripts

### `npm run prisma:generate "<migrate name>"`

Sync prisma schema to database schema. Make schema change in `schema.prisma` file and run this command.

### `npm run prisma:client`

Generate artifacts (e.g. Prisma Client)

### `npm run prisma:deploy`

Applies all pending migrations.

### `npm run prisma:pull`

Adds Prisma models to Prisma schema that reflect the current database schema.
