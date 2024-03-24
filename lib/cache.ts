import { cache } from 'react'
import { db } from './db'
 
export const getItem = cache(async (id: string) => {
    const allDataForOrg = await db.entityGroup.findMany({
        where: {
            organizationId: id,
        },
        include: {
            entities: true,
        },
    })
}, )