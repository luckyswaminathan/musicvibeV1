const supabase = require('../../supabase');

async function getPlaylistUrl(userId, playlistId) {
  try {
    const {data, error} = await supabase.
    from('user_playlists')
    .select('playlist_url')
    .eq('user_id', userId)
    .eq('playlist_id', playlistId)

    
    return data[0].playlist_url;
  }
  catch (error) {
    console.error('Failed to fetch playlist url:', error);
    throw error;
  }
}
async function getUserPlaylists(userId, limit = 50, offset = 0) {
  try {
    console.log(userId);
    const { data, error, count } = await supabase
      .from('user_playlists')
      .select('playlist_id, name, created_at, playlist_url, cover_image_url', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching user playlists:', error);
      throw error;
    }

    const formattedPlaylists = data.map(playlist => ({
      playlistId: playlist.playlist_id,
      playlistName: playlist.name,
      createdAt: playlist.created_at,
      playlistUrl: playlist.playlist_url,
      cover_image_url: playlist.cover_image_url
    }));
    console.log(formattedPlaylists);
    return {
      formattedPlaylists,
    };
  } catch (error) {
    console.error('Failed to fetch user playlists:', error);
    throw error;
  }
}

module.exports = { getUserPlaylists, getPlaylistUrl };