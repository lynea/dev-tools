import { db } from "@/lib/db";
import { TODO_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
  const statuses = [TODO_STATUS.COMPLETED, TODO_STATUS.ACTIVE];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      firstName: "User",
      password: "1234",
    },
    include: {
      Todo: true,
    },
  });

  const todos = await db.todo.createMany({
    data: [
      {
        body: "23232",
        owner: user.id,
        title: "test",
      },
      {
        body: "23232",
        owner: user.id,
        title: "test",
      },
    ],
  });

  console.log({ user, todos });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
