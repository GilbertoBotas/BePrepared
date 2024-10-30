/*
  Warnings:

  - Added the required column `province_id` to the `subscibers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscibers" ADD COLUMN     "province_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subscibers" ADD CONSTRAINT "subscibers_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
