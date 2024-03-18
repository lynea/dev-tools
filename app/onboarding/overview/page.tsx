import { auth } from '@clerk/nextjs'
import { Title } from '@/components/Title/Title'
import { db } from '@/lib/db'
import { CompletedPageParams } from '@/app/onboarding/types/pageProps'
import { Card } from '@/components/ui/card'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    const userInfo = auth()

    const { orgId } = userInfo

    if (!orgId) return <>no orgId was found</>

    const groupWithEntities = await db.entityGroup.findFirst({
        where: {
            organizationId: orgId,
        },
        include: {
            entities: true,
        },
    })

    if (!groupWithEntities) return <>no organisation was found</>

    return (
        <>
            <section className="mt-5 flex w-full flex-col ">
                <Title>Looking for a recap?</Title>

                {groupWithEntities.entities.map((entity) => (
                    <>
                        <h2 className="mb-4 mt-4 text-4xl font-bold text-foreground">
                            {groupWithEntities.name}
                        </h2>
                        <div className=" mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            {groupWithEntities.entities.map((entity, index) => (
                                <Card
                                    key={entity?.name! + index}
                                    href={`/onboarding/overview/${groupWithEntities.id}/${entity.id}`}
                                    className=" relative max-w-md bg-slate-50 "
                                >
                                    <h5 className="text-2xl font-bold tracking-tight text-main-200  ">
                                        {entity?.name}
                                    </h5>
                                </Card>
                            ))}
                        </div>
                    </>
                ))}
            </section>
        </>
    )
}
