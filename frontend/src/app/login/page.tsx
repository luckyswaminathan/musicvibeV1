import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthButtonClient from '../../ui/navbar/auth-button-client';

export default async function Login() {
    const supabase = createServerComponentClient({ cookies }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });


    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        redirect('/');
    } 
    return <AuthButtonClient session={session} />;

}