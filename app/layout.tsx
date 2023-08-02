import QueryProvider from '@/components/QueryClient/QueryClient'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import './globals.css'
import { TodoOverView } from '@/components/TodoOverView/TodoOverview'
import { TodoList } from '@/components/TodoOverView/TodoList'

import { Nav } from '@/components/Nav/Nav'

export const metadata = {
    title: 'Mijndomein dev tools',
    description: 'Created with love by rene van Dijk',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="flex h-full min-h-screen w-full flex-col items-center  justify-center bg-main-200">
                <TodoOverView>
                    {/* @ts-ignore */}
                    <TodoList />
                </TodoOverView>
                <main className=" mt-20 flex h-full min-h-[calc(100vh_-_10rem)]   w-11/12 items-center  justify-center lg:mt-8 lg:max-w-7xl">
                    <QueryProvider>
                        <ClerkProvider>
                            <Nav />

                            {children}
                        </ClerkProvider>
                    </QueryProvider>
                </main>
                <footer className="mt-10 flex w-full items-center justify-center py-5 text-white  ">
                    Made with <span className="text-pink mx-1">♡</span> by Rene
                    van Dijk
                </footer>
            </body>
        </html>
    )
}
