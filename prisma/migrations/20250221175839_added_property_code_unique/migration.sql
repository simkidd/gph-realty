/*
  Warnings:

  - A unique constraint covering the columns `[propertyCode]` on the table `properties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "properties_propertyCode_key" ON "properties"("propertyCode");
