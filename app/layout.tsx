import QueryProvider from '@/components/QueryClient/QueryClient'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider'

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
        <html lang="en" suppressHydrationWarning>
            <body className=" h-full min-h-screen w-full overflow-x-hidden ">
                <main className=" flex h-full ">
                    <QueryProvider>
                        <ClerkProvider>
                            <Flowbite theme={{ theme: customTheme }}>
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="system"
                                    enableSystem
                                    disableTransitionOnChange
                                >
                                    {children}
                                </ThemeProvider>
                            </Flowbite>
                        </ClerkProvider>
                    </QueryProvider>
                </main>
                <Toaster />
            </body>
        </html>
    )
}
