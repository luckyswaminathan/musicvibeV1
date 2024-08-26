
import axios from 'axios';
import { UUID } from 'crypto';

import { Database } from './types/database.types';

export default function SongsRender({ songs }: { songs: Database['public']['Tables']['songs']['Row'][] }) {
  return (
    <div>
      {songs?.map((song) => (
        <div key={song.song_id}>
          <h2>{song.song_name}</h2>
          <p>Artist: {song.artist}</p>
          {song.preview_link && (
            <a href={song.preview_link}>{song.preview_link}</a>
          )}
        </div>
      ))}
    </div>
  );
}

