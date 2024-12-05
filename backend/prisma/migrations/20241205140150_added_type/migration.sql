-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "document" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'text',
ALTER COLUMN "link" DROP NOT NULL;
