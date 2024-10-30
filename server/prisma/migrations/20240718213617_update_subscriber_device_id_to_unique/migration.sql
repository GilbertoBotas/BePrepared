/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `subscibers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "subscibers_district_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "subscibers_device_id_key" ON "subscibers"("device_id");
