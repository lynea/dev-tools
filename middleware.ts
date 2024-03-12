import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
    afterAuth(auth, req, evt) {
        // Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url })
        }
        // Redirect signed in users to organization selection page if they are not active in an organization
        if (
            auth.userId &&
            !auth.orgId &&
            req.nextUrl.pathname !== '/account/organization/create'
        ) {
            const orgSelection = new URL(
                '/account/organization/create',
                req.url
            )
            return NextResponse.redirect(orgSelection)
        }
        // If the user is signed in and trying to access a protected route, allow them to access route
        if (auth.userId && !auth.isPublicRoute) {
            return NextResponse.next()
        }
        // Allow users visiting public routes to access them
        return NextResponse.next()
    },

    publicRoutes: [
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
