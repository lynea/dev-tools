import { LinkGenerator } from '@/components/LinkGenerator/LinkGenerator'

export default async function Page() {
    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <h1 className="mb-6 text-6xl font-bold text-white">
                generate onboarding link
            </h1>
            <LinkGenerator />
        </section>
    )
}
