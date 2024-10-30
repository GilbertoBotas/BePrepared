/*
  Warnings:

  - A unique constraint covering the columns `[designation]` on the table `discricts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[designation]` on the table `provinces` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "discricts_designation_key" ON "discricts"("designation");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_designation_key" ON "provinces"("designation");
