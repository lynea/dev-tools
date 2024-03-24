'use client'

import { createEntityGroup } from '@/app/actions'
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
import { entityGroupschema } from '@/lib/schema/entityGroup.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export const EntityGroupForm = () => {
    const form = useForm<z.infer<typeof entityGroupschema>>({
        resolver: zodResolver(entityGroupschema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            slug: '',
            level: 1,
        },
    })

    const nameInput = form.watch('name')

    useEffect(() => {
        // Whenever title changes, update slug with its value
        form.setValue(
            'slug',
            nameInput?.toLocaleLowerCase().replace(/\s+/g, '-')
        )
    }, [nameInput, form.setValue])

    const onSubmit = async (data: z.infer<typeof entityGroupschema>) => {
        try {
            await createEntityGroup(data).then(() => {
                form.reset()
                toast('Entity group created successfully')
            })
        } catch (error) {
            console.error('error creating entity group', error)
            toast(
                'Something went wrong while creating the entity group. Please try again.'
            )
        }
    }

    return (
        <section className="mt-5 flex w-3/6 flex-col ">
            <h1 className="text-2xl font-bold ">Create entity group</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="title">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="companies" {...field} />
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
                                        disabled
                                        placeholder="companies"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="level">Level</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
                                </FormControl>
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
