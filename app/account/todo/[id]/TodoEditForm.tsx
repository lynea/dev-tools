'use client'

import { createTodo, updateTodo } from '@/app/actions'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { todoSchema, todoUpdateSchema } from '@/lib/schema/entityGroup.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Step } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export const TodoEditForm = ({
    steps,
    currentTodoInfo,
}: {
    steps: Step[]
    currentTodoInfo: z.infer<typeof todoUpdateSchema>
}) => {
    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),

        mode: 'onChange',
        defaultValues: {
            description: currentTodoInfo?.description,
            stepId: currentTodoInfo.stepId,
            title: currentTodoInfo.title,
        },
    })

    const onSubmit = async (data: z.infer<typeof todoSchema>) => {
        try {
            await updateTodo({ ...data, id: currentTodoInfo.id }).then(() => {
                toast('Todo updated successfully')
            })
        } catch (error) {
            console.error('error updating step', error)
            toast(
                'Something went wrong while updating the todo. Please try again.'
            )
        }
    }

    return (
        <section className="mt-5 flex w-3/6 flex-col ">
            <h1 className="text-2xl font-bold ">Update todo</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="title">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="getting started"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="get some coffee and start coding"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stepId"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel>Parent</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a step for the todo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {steps?.map((step) => (
                                            <SelectItem
                                                key={step.id}
                                                value={step.id}
                                            >
                                                {step.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="mt-5" disabled={!form.formState.isValid}>
                        {form.formState.isLoading ? (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {form.formState.isLoading ? 'Creating...' : 'Create'}
                    </Button>
                </form>
            </Form>
        </section>
    )
}
