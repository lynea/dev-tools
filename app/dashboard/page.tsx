import { Title } from '@/components/Title/Title'

import { CompletedPageParams } from '@/app/onboarding/types/pageProps'
import { Button } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { CreateEntity } from '@/components/CreateEntity/CreateEntity'

//mvp : render form to add a entity and give it a title
// a entity has : a name a parent

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    return (
        <>
            <section className="mt-5 flex w-full flex-col text-white ">
                <CreateEntity orgNum={1}></CreateEntity>
            </section>
        </>
    )
}
