import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { create } from 'cypress/types/lodash'
import { admin } from 'googleapis/build/src/apis/admin'

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
        )
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    const bodyObject = JSON.parse(body)

    const createUser = async (userId: string) => {
        console.log('userid sdsdsds', userId)
        const res = await db.user.create({
            data: {
                id: userId,
            },
        })

        return res
    }

    // Get the ID and type
    const { id } = evt.data
    const eventType = evt.type

    switch (eventType) {
        case 'user.created':
            try {
                const { id } = await createUser(bodyObject.data.id)
            } catch (error) {
                console.error('Error creating user:', error)
            }

            break

        case 'organization.created':
            try {
                const res = await db.organization.create({
                    data: {
                        id: bodyObject.data.id,
                        name: bodyObject.data.name,
                        slug: bodyObject.data.slug,
                        userOrganizations: {
                            create: {
                                role: 'admin',
                                user: {
                                    connect: {
                                        id: bodyObject.data.created_by,
                                    },
                                },
                            },
                        },
                        createdBy: {
                            connectOrCreate: {
                                where: { id: bodyObject.data.created_by },
                                create: { id: bodyObject.data.created_by },
                            },
                        },
                    },
                })

                console.log('created organization:', res)
            } catch (error) {
                console.error('Error creating user:', error)
            }

            break

        case 'user.updated':
            console.log('update not implemented yet')
            // Do something with the user updated event
            break
        case 'user.deleted':
            console.log('delete not implemented yet')
            // Do something with the user deleted event
            break

        case 'organizationInvitation.accepted':
            console.log('delete not implemented yet')

            //create a user
            // connect to the organization

            const res = await db.user.create({
                data: {
                    id: bodyObject.data.id,
                    userOrganizations: {
                        create: {
                            role:
                                bodyObject.data.role === 'admin'
                                    ? 'admin'
                                    : 'user',
                            organization: {
                                connect: {
                                    id: bodyObject.data.organization_id,
                                },
                            },
                        },
                    },
                },
            })

            console.log('a invite was accepted and a user was created: ', res)

            console.log('syncing todos for the user and the organization')

            //get all the todos for the organization
            const todos = await db.todo.findMany({
                where: {
                    organizationId: bodyObject.data.organization_id,
                },
            })

            console.log('todos:', todos.length)

            //add them to the user
            const todosForUser = await db.userTodo.createMany({
                data: todos.map((todo) => {
                    return {
                        userId: bodyObject.data.id,
                        todoId: todo.id,
                        isCompleted: false,
                    }
                }),
            })

            console.log('todosForUser:', todosForUser.count)

            break

        default:
            console.log(`Unknown event type: ${eventType}`)
    }

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    return new Response('', { status: 200 })
}
