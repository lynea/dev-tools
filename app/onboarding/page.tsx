import { Title } from '@/components/Title/Title'
import { auth } from '@clerk/nextjs'
import { TSGScene } from '@/components/TsgScene/TsgScene'
import { Toast } from '@/components/Toast/Toast'
import { db } from '@/lib/db'
import { Button } from '@/components/Button/Button'
import Link from 'next/link'

export default async function Page() {
    // const user = await currentUser()
    const userInfo = auth()

    const { orgId } = userInfo

    if (!orgId) throw new Error('no orgId found')

    const organizationInfo = await db.organization.findFirst({
        where: {
            id: orgId,
        },
    })

    const firstEntityGroupForOrg = await db.entityGroup.findFirst({
        where: {
            organizationId: orgId,
        },
    })

    if (!firstEntityGroupForOrg)
        throw new Error(`no entity group found with orgId: ${orgId} `)
    if (!organizationInfo) throw new Error('no entity group found')

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Toast />

            <Title size="xl"> My onboarding </Title>
            <h2 className="mt-6 mb-2 text-4xl font-bold text-white">
                {' '}
                Welcome {userInfo.user?.firstName}!{' '}
            </h2>
            <h2 className="text-3xl font-bold text-white">
                {`And congrats on your first day at ${organizationInfo?.name}!`}
            </h2>

            <div className="mb-12 h-96">
                <TSGScene />
            </div>
            <p className="mt-20  text-2xl text-white">
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
