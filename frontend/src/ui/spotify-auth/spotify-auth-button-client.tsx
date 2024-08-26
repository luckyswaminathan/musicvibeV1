'use client';
import { Button } from '@/components/button';
import { Session } from '@supabase/auth-helpers-nextjs';

export default function SpotifyButtonClient({ session }: { session: Session | null }) {
  const handleLogin = async () => {
    try {
    
      // Make a POST request to your backend to initiate the login process
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ session }),
        // Include credentials like cookies in the request
      });
      console.log('Response:', response);

      // The backend will handle the redirect, so you don't need to do anything here
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Button onClick={handleLogin}>
      {session ? 'Logout' : 'Login with Spotify'}
    </Button>
  );
}
