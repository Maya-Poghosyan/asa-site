import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    return NextResponse.next() // continue to the route
}

// export const config = {
//     // TODO - when you actually create the paths that need to be blocked, add them here
//     // matcher: ['', '', '', '', '']
// }

