import QueryProvider from '@/components/QueryClient/QueryClient'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider'

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
        <html lang="en" suppressHydrationWarning>
            <body className=" h-full min-h-screen w-full  ">
                <main className=" flex h-full ">
                    <QueryProvider>
                        <ClerkProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                                disableTransitionOnChange
                            >
                                {children}
                            </ThemeProvider>
                        </ClerkProvider>
                    </QueryProvider>
                </main>
                <Toaster />
            </body>
        </html>
    )
}
