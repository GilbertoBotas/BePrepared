/*
  Warnings:

  - You are about to drop the `Subscriber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscriber" DROP CONSTRAINT "Subscriber_district_id_fkey";

-- DropTable
DROP TABLE "Subscriber";

-- CreateTable
CREATE TABLE "subscibers" (
    "id" TEXT NOT NULL,
    "phone" VARCHAR(9) NOT NULL,
    "device_id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "district_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscibers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscibers_phone_key" ON "subscibers"("phone");

-- AddForeignKey
ALTER TABLE "subscibers" ADD CONSTRAINT "subscibers_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "discricts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
