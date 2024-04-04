'use client'

import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

type DeleteEntryProps = {
    deleteAction: any
    entryId: string
}

export const DeleteEntry: FunctionComponent<DeleteEntryProps> = ({
    deleteAction,
    entryId,
}) => {
    const deleteActionWithId = deleteAction.bind(null, entryId)

    return (
        <form action={deleteActionWithId}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="submit"
                            variant={'destructive'}
                            size={'icon'}
                        >
                            <FontAwesomeIcon icon={faTrash} size="sm" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>All child entries will be deleted as well!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </form>
    )
}
