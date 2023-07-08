"use client";

import { FunctionComponent, ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TodoList } from "./TodoList";
//it gets a list of todos from the server and displays them in a list

type TodoOverViewProps = {
  children: ReactNode;
};

export const TodoOverView: FunctionComponent<TodoOverViewProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="font-sm absolute w-fit top-3 right-3 text-white z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {" "}
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`h-full w-full backdrop-filter backdrop-blur-lg   absolute top-0 right-0 cursor-pointer ${
          isOpen ? "block" : "hidden"
        } `}
      >
        {" "}
      </div>

      <div
        className={`w-72 h-full absolute top-0 right-0 p-6 bg-purple-100 flex flex-col ease-in-out duration-300 ${
          isOpen ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <h3 className="text-3xl font-bold text-white mb-4">Todos</h3>
        {children}
      </div>
    </div>
  );
};
