-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "description" TEXT,
ADD COLUMN     "socials" JSONB DEFAULT '[]';
