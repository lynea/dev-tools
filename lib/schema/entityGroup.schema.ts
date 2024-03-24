import { z } from 'zod'

export const entityGroupschema = z.object({
    name: z.string().min(5, 'Name must be at least 5 characters'),
    slug: z
        .string()
        .min(5, 'Slug must be at least 5 characters')
        .transform((slug) => slug.toLowerCase().replace(/\s+/g, '-')),
    level: z.coerce
        .number({
            required_error: 'Level is required',
            invalid_type_error: 'Level must be a number',
        })
        .int()
        .positive(),
})

export const entityGroupUpdateSchema = entityGroupschema.extend({
    id: z.string().uuid('Id must be a valid UUID'),
})

export const entitySchema = z.object({
    name: z.string().min(5, 'Name must be at least 5 characters'),
    slug: z.string().min(5, 'Slug must be at least 5 characters'),
    entityGroupId: z.string().uuid('Entity Group ID must be a valid UUID'),
})

export const entityUpdateSchema = entitySchema.extend({
    id: z.string().uuid('Id must be a valid UUID'),
})

export const chapterSchema = z.object({
    title: z.string().min(5, 'title must be at least 5 characters'),
    slug: z
        .string()
        .min(5, 'Slug must be at least 5 characters')
        .transform((slug) => slug.toLowerCase().replace(/\s+/g, '-')),
    entityId: z.string().uuid('Entity ID must be a valid UUID'),
})

export const chapterUpdateSchema = chapterSchema.extend({
    id: z.string().uuid('Id must be a valid UUID'),
})

export const stepSchema = z.object({
    title: z.string().min(5, 'title must be at least 5 characters'),
    videoUrl: z.string().optional(),
    description: z
        .string()
        .min(15, {
            message: 'Description must be at least 10 characters.',
        })
        .max(1000, {
            message: 'Description must not be longer than 1000 characters.',
        }),
    slug: z
        .string()
        .min(5, 'Slug must be at least 5 characters')
        .transform((slug) => slug.toLowerCase().replace(/\s+/g, '-')),
    chapterId: z.string().uuid('Entity ID must be a valid UUID'),
    order: z.coerce
        .number({
            required_error: 'Level is required',
            invalid_type_error: 'Level must be a number',
        })
        .int()
        .positive(),
})

export const stepUpdateSchema = stepSchema.extend({
    id: z.string().uuid('Id must be a valid UUID'),
})

export const todoSchema = z.object({
    title: z.string().min(5, 'title must be at least 5 characters'),
    description: z
        .string()
        .min(15, {
            message: 'Description must be at least 10 characters.',
        })
        .max(1000, {
            message: 'Description must not be longer than 1000 characters.',
        }),
    stepId: z.string().uuid('Entity ID must be a valid UUID'),
})

export const todoUpdateSchema = todoSchema.extend({
    id: z.string().uuid('Id must be a valid UUID'),
})
