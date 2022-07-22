-- CreateTable
CREATE TABLE "BookExchangeSession" (
    "id" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "exchangeDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "requesterId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "backwardExchangeSessionId" TEXT,

    CONSTRAINT "BookExchangeSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookExchangeSession_backwardExchangeSessionId_key" ON "BookExchangeSession"("backwardExchangeSessionId");

-- AddForeignKey
ALTER TABLE "BookExchangeSession" ADD CONSTRAINT "BookExchangeSession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookExchangeSession" ADD CONSTRAINT "BookExchangeSession_backwardExchangeSessionId_fkey" FOREIGN KEY ("backwardExchangeSessionId") REFERENCES "BookExchangeSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
