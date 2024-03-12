'use client'

import { FunctionComponent, ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faSun } from '@fortawesome/free-solid-svg-icons'

//it gets a list of todos from the server and displays them in a list

type TodoOverViewProps = {
    children: ReactNode
}

export const TodoOverView: FunctionComponent<TodoOverViewProps> = ({
    children,
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <FontAwesomeIcon
                        icon={faListUl}
                        className="h-[1.4rem] w-[1.2rem] "
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Todos</SheetTitle>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}
