"use client";

import { FunctionComponent } from "react";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Todo } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { StepTodo } from "@/app/onboarding/types/todo";
import { Step } from "@/app/onboarding/types/step";

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
      axios.get("/api/todo").then((res) => res.data)
  );

  const createTodos = useMutation((todos: StepTodo[]) => {
    return axios
      .put(`/api/todo`, todos)
      .then(() => router.push(route))
      .catch((e) => console.error("could not update todo", error));
  });

  const handleClick = () => {
    if (createTodos.isLoading || isLoading) return;

    const notInDb =
      todoInfo?.filter((todo) => {
        return !dbTodos?.some((dbTodo) => dbTodo.id === todo.id);
      }) ?? [];

    const forDB: StepTodo[] = notInDb.map((todo) => ({
      title: todo.title,
      description: todo.description,
      id: todo.id,
    }));

    if (notInDb.length > 0) {
      createTodos.mutate(forDB);
    } else {
      router.push(route);
    }
  };

  return (
    <Button disabled variant="primary" onClick={handleClick}>
      {createTodos.isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spinPulse />
      ) : (
        "Next"
      )}
    </Button>
  );
};
