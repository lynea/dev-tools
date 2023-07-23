import { Todo } from '@prisma/client'
import {
    convertCMSTodosForDB,
    decrementChapter,
    decrementStep,
    incrementChapter,
    incrementStep,
} from '../utils/todo'
import { describe, expect, test } from 'vitest'

describe('utils: step', () => {
    test(' increment step', () => {
        const result = incrementStep('/onboarding', 'abc', '123')
        expect(result).toBe('/onboarding/abc/123')
    })

    test('decrementStep', ({ expect }) => {
        // Test if the step is correctly decremented
        expect(decrementStep('/book', 'abc', '123')).toBe('/book/abc/123')

        // Test complex base path
        expect(decrementStep('/book/subsection', '123', 'abc')).toBe(
            '/book/subsection/123/abc'
        ) // Correctly handle a complex base path
    })

    test('should return the next chapter path', () => {
        const basePath = '/book'
        const expectedPath = '/book/abc/123'

        const result = incrementChapter(basePath, {
            firstStepId: '123',
            id: 'abc',
        })

        expect(result).toEqual(expectedPath)
    })

    test('should decrement the previous chapter path', () => {
        const basePath = '/book'
        const prevChapter = '123'
        const lastStepOfPrevChapter = 'abc'
        const expectedPath = '/book/123/abc'

        const result = decrementChapter(
            basePath,
            prevChapter,
            lastStepOfPrevChapter
        )

        expect(result).toEqual(expectedPath)
    })

    test('should convert CMS todos to DB todos', () => {
        const cmsTodos = {
            onboardStep: {
                linkedFrom: {
                    todoCollection: {
                        items: [
                            {
                                title: 'Todo 1',
                                description: 'Description 1',
                                sys: { id: '1' },
                            },
                            {
                                title: 'Todo 2',
                                description: 'Description 2',
                                sys: { id: '2' },
                            },
                        ],
                    },
                },
            },
        }
        const owner = 'test'
        const dbTodos: Todo[] = [
            {
                title: 'Todo 1',
                body: 'Description 1',
                cmsId: '1',
                owner,
                completed: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                id: '1',
            },
        ]
        const expectedTodos = [
            {
                title: 'Todo 1',
                body: 'Description 1',
                cmsId: '1',
                owner,
                completed: true,
            },
            {
                title: 'Todo 2',
                body: 'Description 2',
                cmsId: '2',
                owner,
                completed: false,
            },
        ]

        const result = convertCMSTodosForDB(cmsTodos, owner, dbTodos)

        expect(result).toEqual(expectedTodos)
    })
})
