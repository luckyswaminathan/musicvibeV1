import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SpotifyButtonClient from './spotify-auth-button-client';

export default async function SpotifyButtonServer() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    return <SpotifyButtonClient session={session} />;
}   