"use client";

import type { StepTodo } from "@/app/onboarding/types/todo";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "@prisma/client";
import axios from "axios";
import { FunctionComponent } from "react";
import { useMutation, useQuery } from "react-query";

type TodoWrapperProps = {
  todosForStep: StepTodo[];
};

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
    axios.get("/api/todo").then((res) => res.data)
  );

  const updateTodo = useMutation((todo: Todo) => {
    return axios
      .post(`/api/todo/${todo.id}`, {
        action: todo.completed ? "uncomplete" : "complete",
      })
      .then(() => refetch())
      .catch((e) => console.error("could not update todo", e));
  });

  const createTodos = useMutation((todos: StepTodo[]) => {
    return axios
      .put(`/api/todo`, todos)
      .then(() => refetch())
      .catch((e) => console.error("could not update todo", e));
  });

  const stepTodoIsinDb = (stepTodo: StepTodo): Boolean => {
    console.log("dbTodos", dbTodos);
    console.log("stepTodo", stepTodo);

    return dbTodos?.some((dbTodo: Todo) => dbTodo.id === stepTodo.id);
  };

  const todoIsCompleted = (stepTodo: StepTodo) =>
    dbTodos?.find((dbTodo: Todo) => dbTodo.id === stepTodo.id)?.completed;

  const handleToggle = (stepTodo: StepTodo) => {
    // if the todo was already in the db add or remove it
    // if the todo was not in the db add it to the db

    if (stepTodoIsinDb(stepTodo)) {
      console.log("already in db");
      const dbTodo = dbTodos.find((dbTodo: Todo) => dbTodo.id === stepTodo.id);

      if (!dbTodo) return;

      updateTodo.mutate(dbTodo);
    } else {
      createTodos.mutate([stepTodo]);
    }
  };

  return (
    <>
      {todosForStep?.map((todo) => (
        <>
          {" "}
          {updateTodo.isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse key={todo.id} />
          ) : (
            <label key={todo?.id} className="text-white">
              <input
                type="checkbox"
                disabled={
                  isLoading || updateTodo.isLoading || createTodos.isLoading
                }
                className="mr-2 "
                checked={todoIsCompleted(todo)}
                onChange={() => handleToggle(todo)}
              />
              {todo?.description}
            </label>
          )}
        </>
      ))}
    </>
  );
};
