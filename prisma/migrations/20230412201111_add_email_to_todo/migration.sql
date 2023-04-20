/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_ownerId_fkey";

-- DropIndex
DROP INDEX "Todo_id_key";

-- DropIndex
DROP INDEX "Todo_ownerId_idx";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "ownerId",
DROP COLUMN "status",
ADD COLUMN     "owner" TEXT NOT NULL DEFAULT '';

-- DropEnum
DROP TYPE "TODO_STATUS";
