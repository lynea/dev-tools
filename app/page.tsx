import { SqaureButton } from '@/components/SqaureButton/SquareButton'
import { Title } from '@/components/Title/Title'

import Link from 'next/link'

export default function Home() {
    return (
        <section className="flex h-full w-full flex-col items-center justify-center">
            <Title size="xl"> Mijndomein devtools </Title>

            <div className="mt-4">
                <Link href="/onboarding">
                    <SqaureButton>
                        {' '}
                        <h3 className="text-xl"> onboarding</h3>
                    </SqaureButton>
                </Link>
            </div>
        </section>
    )
}
