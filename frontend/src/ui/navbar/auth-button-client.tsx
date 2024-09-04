'use client';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {Button} from '@/components/button';
const WavyText = ({ text }: { text: string }) => {
    return (
        <span className="wavy-text">
            {text.split('').map((char, index) => (
                <span 
                    key={index} 
                    className={char === ' ' ? 'space' : 'wavy-letter'}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};
export default function AuthButtonClient({session} : {session: Session | null}) {
    const supabase = createClientComponentClient(
        {supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,}
    );
    const router = useRouter();
    
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "spotify",
            options: { redirectTo: "http://localhost:3000/auth/callback" }
        });
      }
    

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }
    return session ? (
        <a  onClick={handleSignOut} className='bubbly-font'> 
            <WavyText text="Sign Out" />
        </a>
    )
    : (
        <a  onClick={handleSignIn} className='bubbly-font'> 
        <WavyText text="Sign In" />
    </a>
    )
    }