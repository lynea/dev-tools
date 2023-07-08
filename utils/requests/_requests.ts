import { TodoForDb } from "@/app/onboarding/types/todo";
import { Todo } from "@prisma/client";

export const getTodosForUser = async (userId: string): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:3000/api/todos/${userId}`, {
    headers: {},
    cache: "no-cache",
    next: {
      tags: ["todos"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const createTodosForUser = async (
  userId: string,
  todos: TodoForDb[]
): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:3000/api/todos/${userId}`, {
    headers: {},
    body: JSON.stringify(todos),
    method: "POST",
    cache: "no-cache",
    next: {
      tags: ["create-todos"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to post todos");
  }

  return res.json();
};
