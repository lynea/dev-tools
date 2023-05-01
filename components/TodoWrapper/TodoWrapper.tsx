"use client";

import { Todo } from "@prisma/client";
import axios from "axios";
import { FunctionComponent, useState } from "react";
import { useMutation, useQuery } from "react-query";

// a todoWrapper fetches a list of todos from an api enpoint
// when clicked it adds it to the db
// then refetches the list of todos

export const TodoWrapper: FunctionComponent = () => {
  const [filter, setFilter] = useState(false);

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

  const filteredTodos: Todo[] = filter
    ? dbTodos?.filter((todo: Todo) => todo.completed === false)
    : dbTodos;

  const updateTodo = useMutation((todo: Todo) => {
    return axios
      .post(`/api/todo/${todo.id}`, {
        action: todo.completed ? "uncomplete" : "complete",
      })
      .then(() => refetch())
      .catch((e) => console.error("could not update todo", e));
  });

  return (
    <>
      {filteredTodos?.map((todo) => (
        <label key={todo?.id} className="text-white">
          <input
            disabled={updateTodo.isLoading}
            type="checkbox"
            className="mr-2 "
            checked={todo?.completed}
            onChange={() => updateTodo.mutate(todo)}
          />
          {todo?.body}
        </label>
      ))}

      <div className="flex mt-7">
        <input
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-pink after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-purple checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-purple checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={() => setFilter(!filter)}
        />
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer text-white mr-6"
          htmlFor="flexSwitchCheckDefault"
        >
          filter todos
        </label>
      </div>
    </>
  );
};
