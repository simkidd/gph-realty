/*
  Warnings:

  - You are about to drop the column `address` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "address",
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lobbies" INTEGER;
