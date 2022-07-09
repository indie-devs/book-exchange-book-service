/*
  Warnings:

  - You are about to drop the column `isDisabled` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "isDisabled",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
