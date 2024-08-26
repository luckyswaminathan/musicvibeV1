import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {cookies } from 'next/headers';
export async function GET(request: NextRequest) {
    const requesturl = new URL(request.url);
    const code = requesturl.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient( {cookies});
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(requesturl.origin);
}