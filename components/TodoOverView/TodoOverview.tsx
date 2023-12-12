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
        <>
            <button
                className="font-sm absolute top-3 right-10 z-40 w-fit text-white"
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
                className={`absolute top-0 right-0 -z-20   h-full w-full cursor-pointer backdrop-blur-lg backdrop-filter ${
                    isOpen ? 'block' : 'hidden'
                } `}
            >
                {' '}
            </div>

            <div
                className={`absolute top-0 right-0 z-30 flex h-full min-h-screen w-96 flex-col overflow-y-scroll bg-gray-800 p-6 duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0 ' : 'translate-x-full'
                }`}
            >
                <h3 className="mb-4 text-3xl font-bold text-white">Todos</h3>
                {children}
            </div>
        </>
    )
}
