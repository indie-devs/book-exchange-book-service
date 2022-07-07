#### Connect to Database

Paste your `DATABASE_URL` variable in `.env.development`
`DATABASE_URL="postgresql://user:pass@localhost:5432/books?schema=public"`

#### DB Migrate

Run this command an set your migrate name

`npm run prisma:generate`

#### Generate artifacts (e.g. Prisma Client)

`npm run prisma:client`

#### Prisma Studio

`npm run prisma:studio`
