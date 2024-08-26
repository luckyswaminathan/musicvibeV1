
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../ui/navbar/auth-button-server";
import { redirect } from "next/navigation";
import SongsButton from "../ui/navbar/songs-button";
import Navbar from "@/ui/navbar/navbar";
import MusicVibe from "@/ui/musicvibe/musicvibe";
import { Button } from "@/components/button"
import SongImage from "@/components/song-image";
import SongComponent from "@/components/song-component";
import SpotifyButtonServer from "@/ui/spotify-auth/spotify-auth-button-server";
export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabase = createServerComponentClient({ cookies }, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  const accessToken = session?.access_token;
  return (
    
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
      
    <div style={{ display: 'flex', flexDirection: 'row', marginTop:'50px', marginLeft: '50px 0', gap:'200px'
    }}>
      <MusicVibe />
      <Navbar />
      <div style = {{marginLeft: '100px', marginTop: '25px'}}>
      <AuthButtonServer/>
      </div>
    </div>
      <SongComponent name={"Song Name"} url={"https://i.scdn.co/image/ab67616d0000b2733f203b8d0d8e54fab416a825"} access_token={accessToken}/>
      </div>
    
  );
}


