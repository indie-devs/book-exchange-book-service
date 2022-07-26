-- CreateEnum
CREATE TYPE "BookExchangeSessionStatus" AS ENUM ('INIT', 'ACCEPTED', 'DECLINED', 'DONE');

-- CreateTable
CREATE TABLE "BookExchangeSession" (
    "id" TEXT NOT NULL,
    "status" "BookExchangeSessionStatus" NOT NULL DEFAULT 'INIT',
    "bookId" INTEGER NOT NULL,
    "exchangeDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "requesterId" TEXT NOT NULL,
    "note" TEXT,
    "reviewId" TEXT,

    CONSTRAINT "BookExchangeSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookExchangeSession" ADD CONSTRAINT "BookExchangeSession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
