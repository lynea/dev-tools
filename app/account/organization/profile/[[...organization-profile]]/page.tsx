import { OrganizationProfile } from '@clerk/nextjs'

export default function OrganizationProfilePage() {
    return (
        <OrganizationProfile
            routing="path"
            path="/account/organization/profile"
        />
    )
}
