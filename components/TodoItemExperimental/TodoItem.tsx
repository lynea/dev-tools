"use client";

import { Todo } from "@prisma/client";
import { FunctionComponent, useTransition } from "react";
import { createOrMutateTodo } from "../../app/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TodoForDb } from "@/app/onboarding/types/todo";

interface TodoItemProps {
  todo: TodoForDb;
  userId: string;
}

//passing userId is not ideal will have to fix
export const TodoItem: FunctionComponent<TodoItemProps> = ({
  todo,
  userId,
}) => {
  let [isPending, startTransition] = useTransition();

  if (isPending)
    return (
      <FontAwesomeIcon
        icon={faSpinner}
        spinPulse
        className="text-white self-start"
      />
    );

  return (
    <div className="flex items-center  ">
      <input
        type="checkbox"
        id={todo.cmsId}
        className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
        checked={todo?.completed}
        // @ts-ignore
        onChange={() => startTransition(() => createOrMutateTodo(userId, todo))}
      />

      <label
        htmlFor={todo.cmsId}
        className="w-full py-4 ml-2 text-sm  text-white font-bold"
      >
        {" "}
        {todo?.body}
      </label>
    </div>
  );
};
