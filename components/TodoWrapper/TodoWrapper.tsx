"use client";

import { Todo } from "@prisma/client";
import axios from "axios";
import { FunctionComponent } from "react";
import { useMutation, useQuery } from "react-query";

// a todoWrapper fetches a list of todos from an api enpoint
// when clicked it adds it to the db
// then refetches the list of todos

export const TodoWrapper: FunctionComponent = () => {
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

  const todos: Todo[] = dbTodos;

  const updateTodo = useMutation((todo: Todo) => {
    return axios
      .post(`http://localhost:3000/api/todo/${todo.id}`, {
        action: todo.completed ? "uncomplete" : "complete",
      })
      .then(() => refetch())
      .catch((e) => console.error("could not update todo", error));
  });

  return (
    <>
      {todos?.map((todo) => (
        <label key={todo?.id} className="text-white">
          <input
            type="checkbox"
            className="mr-2 "
            checked={todo?.completed}
            onChange={() => updateTodo.mutate(todo)}
          />
          {todo?.body}
        </label>
      ))}
    </>
  );
};
