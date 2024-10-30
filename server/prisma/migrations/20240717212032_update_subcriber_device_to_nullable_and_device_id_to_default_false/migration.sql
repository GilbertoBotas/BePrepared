-- AlterTable
ALTER TABLE "subscibers" ALTER COLUMN "device_id" DROP NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false;
