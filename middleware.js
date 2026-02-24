import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Get the token from cookies
    const token = request.cookies.get('voteGuardToken')?.value;

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/vote', '/verify', '/admin'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isProtectedRoute && !token) {
        // Redirect to login if trying to access protected route without token
        console.log(`Redirecting ${pathname} to login - no token found`);
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated and trying to access login/register, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
        console.log(`User already authenticated, redirecting to dashboard`);
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/vote/:path*',
        '/verify/:path*',
        '/admin/:path*',
        '/login',
        '/register'
    ],
};
