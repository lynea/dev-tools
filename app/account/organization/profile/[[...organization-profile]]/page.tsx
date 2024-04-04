import { OrganizationProfile } from '@clerk/nextjs'

export default function OrganizationProfilePage() {
    return (
        <section className="flex h-full w-full items-center justify-center">
            <OrganizationProfile
                routing="path"
                path="/account/organization/profile"
            />
        </section>
    )
}
