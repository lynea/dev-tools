import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: [
        '/',
        '/api/todos/(.*)',
        '/api/webhooks(.*)',
        '/api/uploadthing(.*)',
    ],
})

// Stop Middleware running on static files and public folder
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next
         * - static (static files)
         * - favicon.ico (favicon file)
         * - public folder
         * - public folder
         */
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/',
        '/dashboard',
        '/(api|trpc)(.*)',
    ],
}
