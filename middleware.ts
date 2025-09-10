import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// ref: https://authjs.dev/getting-started/session-management/protecting#nextjs-middleware
// https://nextjs.org/docs/app/guides/authentication

const protectedRoutes = ['/notebooks']
const publicRoutes = ['/', '/about', '/news']

export default auth(req => {
    // check if user is logged in 
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    if(publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.next()
    }

    const isProtectedRoute = protectedRoutes.some(path => 
        nextUrl.pathname.startsWith(path)
    )

    if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL('/login', nextUrl)
        // original url
        redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
        
    }

    return NextResponse.next()
})



export const config = {
    matcher: [
      '/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    ],
}