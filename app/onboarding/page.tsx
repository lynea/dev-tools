import { Title } from '@/components/Title/Title'
import { auth, currentUser } from '@clerk/nextjs'
import { TSGScene } from '@/components/TsgScene/TsgScene'
import { Toast } from '@/components/Toast/Toast'
import { db } from '@/lib/db'
import { Button } from '@/components/Button/Button'
import Link from 'next/link'

export default async function Page() {
    const user = await currentUser()

    const { orgId, orgRole } = auth()

    console.log(user?.firstName)

    if (!orgId) throw new Error('no orgId found create one ')
    if (!user) throw new Error('no user found')

    const organizationInfo = await db.organization.findFirst({
        where: {
            id: orgId,
        },
        include: {
            todos: true,
        },
    })

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    })

    if (!dbUser) throw new Error('no user found in our database')

    if (!organizationInfo)
        return (
            <>
                <p className="mb-5 text-white">
                    you are not part of any organization yet please create one
                    or ask someone to invite you to one
                </p>
                <Link href="/account/organization/create">
                    <Button>Create a new organization</Button>
                </Link>
            </>
        )

    if (!dbUser.startedAt && organizationInfo.todos.length > 0) {
        console.log('user has not started yet, setting start time')

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                startedAt: new Date(),
            },
        })
    }

    const firstEntityGroupForOrg = await db.entityGroup.findFirst({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            level: 'asc',
        },
    })

    if (!firstEntityGroupForOrg)
        return (
            <section className="flex w-full flex-col items-center justify-center ">
                <p className="mb-5 text-white">
                    There are no entitygroups under this organization yet please{' '}
                    {orgRole === 'org:admin'
                        ? 'create one'
                        : 'ask an admin to create one'}
                </p>
                {}
                <Link href="/account/entity-group/create">
                    <Button>Create a new group</Button>
                </Link>
            </section>
        )

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Toast />
            <Title size="xl"> My onboarding </Title>
            <h2 className="mt-6 mb-2 text-4xl font-bold text-white">
                {' '}
                Welcome {user?.firstName}!{' '}
            </h2>
            <h2 className="text-3xl font-bold text-foreground">
                {`And congrats on your first day at ${organizationInfo?.name}!`}
            </h2>
            <div className="mb-12 h-96">
                <TSGScene />
            </div>
            <p className="mt-20  text-2xl text-foreground">
                {' '}
                We will get you up to speed in no time{' '}
            </p>

            <Link
                href={`/onboarding/${firstEntityGroupForOrg?.slug}`}
                className="mt-5"
            >
                <Button> Just click here</Button>
            </Link>
        </section>
    )
}
