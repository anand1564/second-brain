-- AlterTable
ALTER TABLE "User" ADD COLUMN     "link" TEXT,
ADD COLUMN     "shareable" BOOLEAN NOT NULL DEFAULT true;
