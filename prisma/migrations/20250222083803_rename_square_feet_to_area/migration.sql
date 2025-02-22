/*
  Warnings:

  - You are about to drop the column `squareFeet` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "squareFeet",
ADD COLUMN     "area" INTEGER;
