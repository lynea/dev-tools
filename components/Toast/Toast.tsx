'use client'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const Toast = () => {
    const [show, setShow] = useState(true)

    const close = () => {
        setShow(false)
    }

    if (!show) return null

    return (
        <div
            id="toast-bottom-right"
            className="space-x fixed right-5 bottom-5 flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-gray-500 shadow rtl:divide-x-reverse dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
            role="alert"
        >
            <div className="text-sm font-normal">
                This project is currently in alfa if you encounter any problems
                please report them to Rene van Dijk or your team lead
            </div>
            <button
                onClick={close}
                className="font-inherit cursor-pointer border-none bg-transparent p-0 outline-none"
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}
