export type StepTodo = {
    title: string
    description: string
    id: string | null | undefined
}

export interface TodoForDb {
    title: string
    description: string
    stepId: string
}
