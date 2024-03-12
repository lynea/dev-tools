import { TodoOverView } from '@/components/TodoOverView/TodoOverview'
import { TodoList } from '@/components/TodoOverView/TodoList'

import { Nav } from '@/components/Nav/Nav'
import { auth } from '@clerk/nextjs'

export const metadata = {
    title: 'Mijndomein dev tools',
    description: 'Created with love by rene van Dijk',
}

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { orgRole } = auth()

    return (
        <div className="white  flex h-full  min-h-screen w-full    flex-col items-center justify-center bg-background dark:bg-main-200 ">
            <Nav
                isAdmin={orgRole === 'org:admin'}
                sidebarToggle={
                    <>
                        <TodoOverView>
                            <TodoList />
                        </TodoOverView>
                    </>
                }
            />
            <main className="  mt-14 flex  h-full min-h-screen w-3/5  flex-col items-center justify-center ">
                {children}
            </main>
            <footer className="white mt-10 flex w-full items-center justify-center py-5 text-foreground  ">
                Made with <span className="mx-1 text-pink">♡</span> by Rene van
                Dijk
            </footer>
        </div>
    )
}
