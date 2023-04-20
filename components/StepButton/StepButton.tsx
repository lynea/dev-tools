"use client";

import { FunctionComponent } from "react";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Todo } from "@prisma/client";

type Step = {
  title: string;
  description: string;
  id: string | null | undefined;
};

type StepButtonProps = {
  todoInfo: Step[] | undefined;
  route: string;
};

export const StepButton: FunctionComponent<StepButtonProps> = ({
  route,
  todoInfo,
}) => {
  const router = useRouter();

  const {
    isLoading,
    isError,
    data: dbTodos,
    error,
    refetch,
  } = useQuery(
    "todos",
    (): Promise<Todo[]> =>
      //TODO: change link
      axios.get("http://localhost:3000/api/todo").then((res) => res.data)
  );

  const createTodos = useMutation((todos: any[]) => {
    return axios
      .put(`http://localhost:3000/api/todo`, todos)
      .then(() => router.push(route))
      .catch((e) => console.error("could not update todo", error));
  });

  const handleClick = () => {
    const notInDb =
      todoInfo?.filter((todo) => {
        return !dbTodos?.some((dbTodo) => dbTodo.todoId === todo.id);
      }) ?? [];

    const forDB = notInDb.map((todo) => ({
      title: todo.title,
      body: todo.description,
      todoId: todo.id,
    }));

    if (notInDb.length > 0) {
      // addTodos(forDB).then(() => router.push(route));
      createTodos.mutate(forDB);
    } else {
      router.push(route);
    }
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Next
    </Button>
  );
};
