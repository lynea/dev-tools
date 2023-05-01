import { Box } from "@/components/Box/Box";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/api";
import { CelebrationAnimation } from "@/components/CelebrationAnimation/CelebrationAnimation";
import { Title } from "@/components/Title/Title";
import { TodoWrapper } from "../../../components/TodoWrapper/TodoWrapper";
import Link from "next/link";

// get the todos from the user
// if the user has has not finished all todos show the open todos
// otherwise show that he has completed the onboarding
// send out a welcome message to slack
// no round trip to the api needed can do directly to the db

export default async function Page() {
  const user: User | null = await currentUser();

  if (!user?.id) return <>no user was found</>;

  const openTodos = await db.todo
    .findMany({
      where: {
        owner: user.id,
      },
    })
    .catch((err) => {
      console.log(err);
    });

  // const openTodos = todos?.filter((todo) => todo.completed === false);

  return (
    <section className="w-full">
      {openTodos?.length === 0 ? (
        <>
          <Title> Damn, you made it! welcome to the team </Title>
          <CelebrationAnimation />
        </>
      ) : (
        <Box>
          <Title>you have {openTodos?.length} todos left</Title>
          <ul className="mt-6 text-xl">
            {openTodos?.map((todo) => (
              <li key={todo.id}>
                <Link href={`/onboarding/1/1`}>{todo.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </section>
  );
}
