const supabase = require('../../supabase');
const axios = require('axios');

async function storePlaylistData(userId, playlistName, playlistData) {

  // playlist Name is inputted in search box/ button so is also sent to bakcend(worst case we have default value in text)
  // intended flow --> so we already have all songs generated! --> once we have this json output, we need to create the playlist
  // This will only happen after a user allows the playlist to be created? or we could just do the playlists on site with an option to add it
  await insertSongs(playlistData);
  const spotify_access_token = await getValidAccessToken(userId);
  

  const response = await supabase.from('users').select('spotify_id').eq('id', userId).single();
  const username = response.data.spotify_id;

 try {
  const playlistCreateResponse = await axios.post(
      `https://api.spotify.com/v1/users/${username}/playlists`,
      {
          name: playlistName,
          description: 'Generated by MusicVibe for you!',
          public: false
      },
      {
          headers: {
              Authorization: `Bearer ${spotify_access_token}`
          }
      }
  );
  // Process response
  const playlistId = playlistCreateResponse.data.id;
  const timeValue = Math.floor(Date.now() / 1000);
  const playlistUrl = playlistCreateResponse.data.external_urls.spotify;

  await supabase.from('user_playlists').upsert({
    user_id: userId,
    playlist_id: playlistId,
    name: playlistName,
    created_at: timeValue,
    playlist_url: playlistUrl,
  })
  const results = await Promise.all(playlistData.map(async (song) => {
      await supabase.from('playlist_songs').upsert({
        song_id: song.trackId,
        playlist_id: playlistId,
        added_at: timeValue,
      });

      const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        uris: [song.trackUri]
      }, {
        headers: {
          Authorization: `Bearer ${spotify_access_token}`
        }
      });

      return response.data;
    
  }));
    

  return response.data;
} catch (error) {
  console.error('Error creating playlist:', error);
}

}

// uuid sample = 6d6eb05b-70cb-43a7-9ccb-b5f4734a63e6
async function getValidAccessToken(userId) {
  if (!userId) {
    console.error('User ID is undefined');
    throw new Error('User ID is required');
  }

  console.log('Getting valid access token for user:', userId);

  // add way to create user--> redirect to login?
  const { data, error } = await supabase
    .from('users')
    .select('access_token, expires_at, refresh_token')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }
  if (!data) {
    console.error('User not found');
    throw new Error('User not found');
  }

  const now = new Date();
  const expiresAt = new Date(data.expires_at);

  console.log('Token expires at:', expiresAt);
  console.log('Current time:', now);

  if (now >= expiresAt) {
    try {
      const refreshResponse = await axios.get(`http://localhost:3001/api/auth/refresh?userId=${userId}&refresh_token=${data.refresh_token}`);
      return refreshResponse.data.access_token;
    } catch (refreshError) {
      throw refreshError;
    }
  }
  return data.access_token;
}


function parseSpotifyResponse(response) {
    const parsedTracks = response.tracks.map(track => {
        const trackName = track.name;
        const trackId = track.id;
        const trackUri = track.uri;
        const trackDuration = track.duration_ms; 
        const trackPopularity = track.popularity;
        const trackPreviewUrl = track.preview_url;
        const album = track.album;
        const albumName = album.name;
        const albumId = album.id;
        const albumUrl = album.external_urls.spotify;
        const albumImageUrl = album.images[0].url;
        const artist = track.artists[0]; 
        const artistName = artist.name;
        const artistId = artist.id;
        const artistUrl = artist.external_urls.spotify;
        
        return {
            trackName,
            trackId,
            trackUri,
            trackDuration,
            trackPopularity,
            trackPreviewUrl,
            albumName,
            albumId,
            albumUrl,
            albumImageUrl,
            artistName,
            artistId,
            artistUrl
        };
    });

    return parsedTracks;
}


async function insertSongs(songs) {
    for (const song of songs) {
      const { data, error } = await supabase
        .from('songs')
        .upsert({
          spotify_id: song.trackId,
          title: song.trackName,
          artist: song.artistName,
          album: song.albumName,
          duration: song.trackDuration,
          popularity: song.trackPopularity,
          preview_url: song.trackPreviewUrl,
          album_image_url: song.albumImageUrl
        }, {
          onConflict: 'spotify_id'
        });
  
      if (error) {
        return error;
      } else {
        console.log('Inserted/Updated song:', song.trackName);
      }
    }
  }

module.exports = { storePlaylistData,getValidAccessToken, parseSpotifyResponse, insertSongs };