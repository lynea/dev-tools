'use client'

import { createEntity } from '@/app/actions'
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
import { entitySchema } from '@/lib/schema/entityGroup.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { EntityGroup } from '@prisma/client'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

export const EntityForm = ({
    entityGroups,
}: {
    entityGroups: EntityGroup[]
}) => {
    const form = useForm<z.infer<typeof entitySchema>>({
        resolver: zodResolver(entitySchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            slug: '',
            entityGroupId: '',
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

    const onSubmit = async (data: z.infer<typeof entitySchema>) => {
        try {
            await createEntity(data).then(() => {
                form.reset()
                toast('Entity created successfully')
            })
        } catch (error) {
            console.error('error creating entity ', error)
            toast(
                'Something went wrong while creating the entity . Please try again.'
            )
        }
    }

    return (
        <section className="mt-5 flex w-3/6 flex-col ">
            <h1 className="text-2xl font-bold ">Create entity</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel htmlFor="title">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="my company"
                                        {...field}
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
                                        placeholder="my-company"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="entityGroupId"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel>Parent</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select parent for the entity" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {entityGroups.map((entityGroup) => (
                                            <SelectItem
                                                key={entityGroup.id}
                                                value={entityGroup.id}
                                            >
                                                {entityGroup.name}
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
