/*
  Warnings:

  - You are about to drop the `subscibers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_subscriber_id_fkey";

-- DropForeignKey
ALTER TABLE "subscibers" DROP CONSTRAINT "subscibers_district_id_fkey";

-- DropForeignKey
ALTER TABLE "subscibers" DROP CONSTRAINT "subscibers_province_id_fkey";

-- DropTable
DROP TABLE "subscibers";

-- CreateTable
CREATE TABLE "subscribers" (
    "id" TEXT NOT NULL,
    "phone" VARCHAR(9) NOT NULL,
    "device_id" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "district_id" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_phone_key" ON "subscribers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_device_id_key" ON "subscribers"("device_id");

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "discricts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
