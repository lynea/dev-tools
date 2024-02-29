import QueryProvider from '@/components/QueryClient/QueryClient'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { TodoOverView } from '@/components/TodoOverView/TodoOverview'
import { TodoList } from '@/components/TodoOverView/TodoList'

import { Nav } from '@/components/Nav/Nav'
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react'

export const metadata = {
    title: 'Mijndomein dev tools',
    description: 'Created with love by rene van Dijk',
}

const customTheme: CustomFlowbiteTheme = {
    card: {
        root: {
            base: 'bg-white rounded-lg shadow-lg text-main-200',
            href: 'hover:bg-gradient-to-t hover:from-gradientEnd hover:to-gradientStart hover:text-main-200',
        },
    },
    accordion: {
        root: {},

        title: {
            open: {
                on: 'text-white bg-main-100 font-bold ',
            },
            flush: {
                off: 'text-white  ',
                on: 'text-white',
            },
        },
    },
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
                    <TodoList />
                </TodoOverView>
                <main className=" mt-20 flex h-full min-h-[calc(100vh_-_10rem)]   w-11/12 items-center  justify-center lg:mt-8 lg:max-w-6xl">
                    <QueryProvider>
                        <ClerkProvider>
                            <Nav />
                            <Flowbite theme={{ theme: customTheme }}>
                                {children}
                            </Flowbite>
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
