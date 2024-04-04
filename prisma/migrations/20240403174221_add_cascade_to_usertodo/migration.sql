-- DropForeignKey
ALTER TABLE "UserTodo" DROP CONSTRAINT "UserTodo_todoId_fkey";

-- DropForeignKey
ALTER TABLE "UserTodo" DROP CONSTRAINT "UserTodo_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserTodo" ADD CONSTRAINT "UserTodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTodo" ADD CONSTRAINT "UserTodo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
