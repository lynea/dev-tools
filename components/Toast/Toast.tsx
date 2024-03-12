'use client'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export const Toast = () => {
    const [show, setShow] = useState(true)

    const close = () => {
        setShow(false)
    }

    if (!show) return null

    return (
        <Alert className="fixed right-5 bottom-5 max-w-xs">
            <button
                onClick={close}
                className=" absolute top-2 right-2 cursor-pointer border-none bg-transparent p-0 outline-none"
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                This project is currently in alfa if you encounter any problems
                please report them to Rene van Dijk or your team lead
            </AlertDescription>
        </Alert>
    )
}
