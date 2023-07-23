'use client'

import { FunctionComponent, ReactNode, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { TodoList } from './TodoList'
//it gets a list of todos from the server and displays them in a list

type TodoOverViewProps = {
    children: ReactNode
}

export const TodoOverView: FunctionComponent<TodoOverViewProps> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button
                className="font-sm absolute top-3 right-3 z-10 w-fit text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {' '}
                {isOpen ? (
                    <FontAwesomeIcon icon={faXmark} />
                ) : (
                    <FontAwesomeIcon icon={faBars} />
                )}
            </button>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute top-0 right-0 h-full   w-full cursor-pointer backdrop-blur-lg backdrop-filter ${
                    isOpen ? 'block' : 'hidden'
                } `}
            >
                {' '}
            </div>

            <div
                className={`absolute top-0 right-0 flex h-full w-72 flex-col bg-gray-800 p-6 duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0 ' : 'translate-x-full'
                }`}
            >
                <h3 className="mb-4 text-3xl font-bold text-white">Todos</h3>
                {children}
            </div>
        </div>
    )
}
