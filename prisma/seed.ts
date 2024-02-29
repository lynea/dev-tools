import { db } from '@/lib/db'
import { Chapter, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

const chapters = [
    {
        title: 'Chapter One',
        slug: 'chapter-one',
        order: 1,
    },
    {
        title: 'Chapter Two',
        slug: 'chapter-two',
        order: 2,
    },
    {
        title: 'Chapter Three',
        slug: 'chapter-three',
        order: 3,
    },
]

const createChapterAndSteps = async (entityId: string) => {
    for (const chapter of chapters) {
        const createdChapter = await prisma.chapter.create({
            data: { ...chapter, entityId: entityId },
        })

        const steps = [
            {
                title: 'Step One',
                slug: 'step-one',
                chapterId: createdChapter.id,
                description: 'This is the first step.',
                order: 1,
            },
            {
                title: 'Step Two',
                slug: 'step-two',
                chapterId: createdChapter.id,
                description: 'This is the second step.',
                order: 2,
            },
            {
                title: 'Step Three',
                slug: 'step-three',
                chapterId: createdChapter.id,
                description: 'This is the third step.',
                order: 3,
            },
        ]

        //need to create one by one otherwise i do not have the id of the step
        const step1 = await prisma.step.create({
            data: steps[0],
        })

        const step2 = await prisma.step.create({
            data: steps[1],
        })

        const step3 = await prisma.step.create({
            data: steps[2],
        })

        const todos = [
            {
                title: 'Todo One',
                stepId: step1.id,
                description: 'This is the first todo.',
            },
            {
                title: 'Todo Two',
                stepId: step2.id,
                description: 'This is the second todo.',
            },
            {
                title: 'Todo Three',
                stepId: step3.id,
                description: 'This is the third todo.',
            },
        ]

        const createdTodos = await prisma.todo.createMany({
            data: todos,
        })
    }
}

async function main() {
    // Seed Users
    const alice = await db.user.create({
        data: {
            id: 'user_2OVpomuqiqieyOJkzr9knpEjPa3',
        },
    })

    const bob = await prisma.user.create({
        data: {},
    })

    // Seed Organizations
    const org1 = await prisma.organization.create({
        data: {
            name: 'The sharing group',
            slug: 'the-sharing-group',
            createdByUserId: alice.id,
            id: 'org_2bme3utaOlKWytwIOGqSLkP85Uy',
        },
    })

    // Seed UserOrganization
    await prisma.userOrganization.createMany({
        data: [
            { userId: alice.id, organizationId: org1.id, role: Role.admin },
            { userId: bob.id, organizationId: org1.id, role: Role.user },
        ],
    })

    // Seed EntityGroup
    const entityGroup1 = await prisma.entityGroup.create({
        data: {
            name: 'companies',
            slug: 'companies',
            organizationId: org1.id,
            level: 1,
        },
    })

    const entityGroup2 = await prisma.entityGroup.create({
        data: {
            name: 'department',
            slug: 'department',
            organizationId: org1.id,
            level: 2,
        },
    })

    // Seed Entity
    const entity1 = await prisma.entity.create({
        data: {
            name: 'mijndomein',
            slug: 'mijndomein',
            entityGroupId: entityGroup1.id,
        },
    })

    const entity2 = await prisma.entity.create({
        data: {
            name: 'development',
            slug: 'development',
            entityGroupId: entityGroup2.id,
        },
    })

    // Seed Chapter and Steps
    await createChapterAndSteps(entity1.id)

    await createChapterAndSteps(entity2.id)

    // Seed UserTodo
    // await prisma.userTodo.createMany({
    //     data: [
    //         { userId: alice.id, todoId: todo1.id, isCompleted: false },
    //         { userId: bob.id, todoId: todo1.id, isCompleted: true },
    //     ],
    // })

    //seed userentity
    await prisma.userEntity.createMany({
        data: [
            { userId: alice.id, entityId: entity1.id },
            { userId: bob.id, entityId: entity1.id },
        ],
    })

    console.log('Database has been seeded!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
