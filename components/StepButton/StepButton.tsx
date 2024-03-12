'use client'

import { FunctionComponent } from 'react'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'
import { Todo } from '@prisma/client'

type StepButtonProps = {
    todosToBeAdded: Todo[]
    route: string
}

export const StepButton: FunctionComponent<StepButtonProps> = ({
    todosToBeAdded,
    route,
}) => {
    const router = useRouter()

    const handleClick = async () => {
        if (todosToBeAdded?.length) {
            router.push(route)
        } else {
            router.refresh()
            router.push(route)
        }
    }
    return (
        <Button disabled onClick={handleClick} className="order-2 lg:order-3">
            Next
        </Button>
    )
}
