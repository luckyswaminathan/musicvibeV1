const supabase = require('../../supabase');

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

module.exports = { parseSpotifyResponse, insertSongs };