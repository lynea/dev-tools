import { CreateOrganization } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
    return (
        <section className="flex h-full w-full items-center justify-center">
            <CreateOrganization />
        </section>
    )
}
