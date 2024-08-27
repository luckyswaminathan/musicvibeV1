const supabase = require('../../supabase');


async function getValidAccessToken(userId) {
  if (!userId) {
    console.error('User ID is undefined');
    throw new Error('User ID is required');
  }

  console.log('Getting valid access token for user:', userId);
  const { data, error } = await supabase
    .from('users')
    .select('access_token, expires_at')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
  if (!data) {
    console.error('No data found for user:', userId);
    throw new Error('No token found for user');
  }

  const now = new Date();
  const expiresAt = new Date(data.expires_at);

  console.log('Token expires at:', expiresAt);
  console.log('Current time:', now);

  if (now >= expiresAt) {
    try {
      const refreshResponse = await axios.get(`http://localhost:3000/api/auth/refresh?userId=${userId}`);
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
        console.error('Error inserting song:', song.trackName, error);
      } else {
        console.log('Inserted/Updated song:', song.trackName);
      }
    }
  }

module.exports = { getValidAccessToken, parseSpotifyResponse, insertSongs };