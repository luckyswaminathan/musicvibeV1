import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SongsRender from './songs-render-client';

export default async function SongsRenderServer() {
  const supabase = createServerComponentClient({ cookies });
  let { data: songs, error } = await supabase
  .from('songs')
  .select('artist, preview_link, song_id, song_name, user_id');

const songsData = songs as { artist: string | null; preview_link: string | null; song_id: string; song_name: string | null; user_id: string; }[];

return <SongsRender songs={songsData} />;
}