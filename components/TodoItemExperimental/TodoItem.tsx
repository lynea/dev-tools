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
    <label className="text-white">
      <input
        type="checkbox"
        className="mr-2 "
        checked={todo?.completed}
        // @ts-ignore
        onChange={() => startTransition(() => createOrMutateTodo(userId, todo))}
      />
      {todo?.body}
    </label>
  );
};
