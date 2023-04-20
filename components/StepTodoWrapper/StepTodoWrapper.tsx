"use client";

import { Todo } from "@prisma/client";
import axios from "axios";
import { FunctionComponent } from "react";
import { useMutation, useQuery } from "react-query";

type StepTodo = {
  title: string;
  description: string;
  id: string | null | undefined;
};

type TodoWrapperProps = {
  todosForStep: StepTodo[];
};

type PostTodo = { body: string; title: string; todoId: number | undefined };

export const StepTodoWrapper: FunctionComponent<TodoWrapperProps> = ({
  todosForStep,
}) => {
  const {
    isLoading,
    isError,
    data: dbTodos,
    error,
    refetch,
  } = useQuery("todos", () =>
    //TODO: change link
    axios.get("http://localhost:3000/api/todo").then((res) => res.data)
  );

  const updateTodo = useMutation((todo: Todo) => {
    return axios
      .post(`http://localhost:3000/api/todo/${todo.id}`, {
        action: todo.completed ? "uncomplete" : "complete",
      })
      .then(() => refetch())
      .catch((e) => console.error("could not update todo", error));
  });

  const createTodo = useMutation((todo: StepTodo) => {
    return axios
      .put(`http://localhost:3000/api/todo`, todo)
      .then(() => refetch())
      .catch((e) => console.error("could not update todo", error));
  });

  const stepTodoIsinDb = (stepTodo: StepTodo) =>
    dbTodos?.some((dbTodo) => dbTodo.todoId === stepTodo.id);

  const todoIsCompleted = (stepTodo: StepTodo) =>
    dbTodos?.find((dbTodo) => dbTodo.todoId === stepTodo.id)?.completed;

  const handleToggle = (stepTodo: StepTodo) => {
    // if the todo was already in the db add or remove it
    // if the todo was not in the db add it to the db

    if (stepTodoIsinDb(stepTodo)) {
      const dbTodo = dbTodos.find((dbTodo) => dbTodo.todoId === stepTodo.id);

      if (!dbTodo) return;

      updateTodo.mutate(dbTodo);
    } else {
      createTodo.mutate(stepTodo);
    }
  };

  return (
    <>
      {todosForStep?.map((todo) => (
        <label key={todo?.id} className="text-white">
          <input
            type="checkbox"
            disabled={isLoading || updateTodo.isLoading || createTodo.isLoading}
            className="mr-2 "
            checked={todoIsCompleted(todo)}
            onChange={() => handleToggle(todo)}
          />
          {todo?.description}
        </label>
      ))}
    </>
  );
};
