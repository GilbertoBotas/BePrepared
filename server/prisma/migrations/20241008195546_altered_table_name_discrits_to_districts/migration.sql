/*
  Warnings:

  - You are about to drop the `discricts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "alerts" DROP CONSTRAINT "alerts_district_id_fkey";

-- DropForeignKey
ALTER TABLE "discricts" DROP CONSTRAINT "discricts_province_id_fkey";

-- DropForeignKey
ALTER TABLE "subscribers" DROP CONSTRAINT "subscribers_district_id_fkey";

-- DropTable
DROP TABLE "discricts";

-- CreateTable
CREATE TABLE "districts" (
    "id" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "districts_designation_key" ON "districts"("designation");

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
