'use client'

import { createStep } from '@/app/actions'
import { Tiptap } from '@/components/Tiptap/Tiptap'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
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
import { stepSchema } from '@/lib/schema/entityGroup.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chapter } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export const StepForm = ({ chapters }: { chapters: Chapter[] }) => {
    const form = useForm<z.infer<typeof stepSchema>>({
        resolver: zodResolver(stepSchema),

        mode: 'onChange',
        defaultValues: {
            title: '',
            description: '',
            slug: '',
            chapterId: '',
            order: 1,
            videoUrl: '',
        },
    })

    const nameInput = form.watch('title')

    useEffect(() => {
        // Whenever title changes, update slug with its value
        form.setValue(
            'slug',
            nameInput?.toLocaleLowerCase().replace(/\s+/g, '-')
        )
    }, [nameInput, form.setValue])

    const onSubmit = async (data: z.infer<typeof stepSchema>) => {
        try {
            await createStep(data).then(() => {
                form.reset()
                toast('Step created successfully')
            })
        } catch (error) {
            console.error('error creating step', error)
            toast(
                'Something went wrong while creating the step. Please try again.'
            )
        }
    }

    return (
        <section className="mt-5 flex w-3/6 flex-col ">
            <h1 className="text-2xl font-bold ">Create Step</h1>
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
                        name="slug"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="slug">Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled
                                        placeholder="getting-started"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="videoUrl">
                                    Youtube Video Id
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="UKSNYzTaQLU"
                                    />
                                </FormControl>
                                <FormDescription>
                                    everything in a youtube link after v=
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="order">Order</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="getting-started"
                                        {...field}
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Tiptap
                                        description="Write a description for the step"
                                        onChange={field.onChange}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="chapterId"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel>Parent</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a chapter for the step" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {chapters?.map((chapter) => (
                                            <SelectItem
                                                key={chapter.id}
                                                value={chapter.id}
                                            >
                                                {chapter.title}
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
