/*
  Warnings:

  - A unique constraint covering the columns `[district_id]` on the table `subscibers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscibers_district_id_key" ON "subscibers"("district_id");
