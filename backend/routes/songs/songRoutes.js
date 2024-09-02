const express = require('express');
const router = express.Router();
const supabase = require('../../supabase');
const axios = require('axios');
const {storePlaylistData, parseSpotifyResponse, getValidAccessToken } = require('./songRoutesHelper');
const { getGroqChatCompletion, getGroqPlaylistTitle } = require('../../helpers/groqClient');

/**
 * @swagger
 * /api/songs/top:
 *   get:
 *     summary: Retrieves the top tracks of the current user
 *     responses:
 *       200:
 *         description: A list of top tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   artist:
 *                     type: string
 *       401:
 *         description: Access token is missing
 */
router.get('/top', async (req, res) => {
    const userId = req.query.userId;
    const access_token = await getValidAccessToken(userId);
    // const access_token = req.access_token;
    
    if (!access_token) {
        return res.status(401).json({ error: 'Access token is missing' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const songs = response.data.items.map(item => ({
            songName: item.name,
            artistName: item.album.artists[0].name
          }));
        return res.status(200).json(songs);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
});

router.post('/recommend', async (req, res) => {
    const userId = req.query.userId || req.body.userId;
    const prompt = req.query.prompt || req.body.prompt || 'I want extremely sad music';
    const seed_genres = req.query.seed_genres || req.body.seed_genres || 'pop,indie,chill,indie-pop,r-n-b';
    
    console.log('Fetching Spotify data for user:', userId);
    const access_token = await getValidAccessToken(userId);
    console.log('Access token:', access_token);
    try {
        
        const prompt = req.query.prompt || 'I want extremely sad music';
        const completion = await getGroqChatCompletion(prompt);
        const seed_genres = req.query.seed_genres || 'pop,indie,chill,indie-pop,r-n-b';

        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                seed_genres: seed_genres,
                limit: 50,
                market: 'ES',
                // min_acousticness: completion.min_acousticness,
                // max_acousticness: completion.max_acousticness,
                target_acousticness: completion.target_acousticness,
                // min_danceability: completion.min_danceability,
                // max_danceability: completion.max_danceability,
                //target_danceability: completion.target_danceability,
                //min_energy: completion.min_energy,
                //max_energy: completion.max_energy,
                target_energy: completion.target_energy,
                //min_instrumentalness: completion.min_instrumentalness,
                // max_instrumentalness: completion.max_instrumentalness,
                //target_instrumentalness: completion.target_instrumentalness,
                //min_liveness: completion.min_liveness,
                max_liveness: completion.max_liveness,
                target_liveness: completion.target_liveness,
                // min_loudness: completion.min_loudness,
                // max_loudness: completion.max_loudness,
                //target_loudness: completion.target_loudness,
                //min_key: completion.min_key,
                // max_key: completion.max_key,
                //target_key: completion.target_key,
                // min_mode: completion.min_mode,
                // max_mode: completion.max_mode,
                //target_mode: Math.round(completion.target_mode),
                // min_popularity: completion.min_popularity,
                // max_popularity: completion.max_popularity,
                //target_popularity: completion.target_popularity,
                // min_speechiness: completion.min_speechiness,
                // max_speechiness: completion.max_speechiness,
                //target_speechiness: completion.target_speechiness,
                // min_tempo: completion.min_tempo,
                // max_tempo: completion.max_tempo,
                target_tempo: completion.target_tempo,
                // min_time_signature: completion.min_time_signature,
                // max_time_signature: completion.max_time_signature,
                target_time_signature: completion.target_time_signature,
                min_valence: completion.min_valence,
                max_valence: completion.max_valence,
                target_valence: completion.target_valence,

            }
        });
        const title = await getGroqPlaylistTitle(prompt);
        const parsedTracks = parseSpotifyResponse(response.data);
        const playlistUrl = await storePlaylistData(userId, title, parsedTracks);
        res.json({ playlistUrl });
        
    } catch (error) {
        res.json({error: error});
    }
});
module.exports = router;
