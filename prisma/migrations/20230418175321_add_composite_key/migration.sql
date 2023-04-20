/*
  Warnings:

  - A unique constraint covering the columns `[id,owner]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_owner_key" ON "Todo"("id", "owner");
