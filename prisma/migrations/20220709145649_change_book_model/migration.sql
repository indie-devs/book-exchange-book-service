-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('NEW', 'VERIFIED', 'BANNED', 'DISABLED', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "isAvailableForExchanging" BOOLEAN NOT NULL DEFAULT true,
    "isDisabled" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "numberOfPages" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "reprintTimes" INTEGER NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "publisher" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "bio" TEXT NOT NULL,
    "authorAvatar" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
