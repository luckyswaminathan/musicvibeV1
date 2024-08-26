const express = require('express');
const groq = require('../../groqClient');
const router = express.Router();
const supabase = require('../../supabase');
const axios = require('axios');
const { parseSpotifyResponse, insertSongs } = require('./songRoutesHelper');
const { getGroqChatCompletion } = require('../../groqClient');

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
    const access_token = 'BQBAXJuDtemad-8_BWbMJrppzDMcLhZAdcrqLx8ioUfHRkjRHKwHAky4s2k3ED7MrEJ5tr6vj9WRJO1bTF2ZmUeZI0iERCbjMIbCwfj5WBg9meGADgZACMOBqAaD8xvytbqGTXJOfNkLQayYdpR0_Hvfjf6d2Imz2gj_mfcxIOakjAOY-egDBSX237E2KKwRpbwgMlYyqWSJrJ9JbkJRoEV5rsC8LzUrpg';
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
        console.error('Error fetching top tracks:', err.message);
        return res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
});

router.get('/recommend', async (req, res) => {
    const access_token = 'BQDksAB6AoUVA2D5WrD69yllGB7iIoMSJCG25Q-RZ8om51n3fZOVN-OPJHnynh15Wr4VKGKCyZKx5Yg8DoOgu252d-YKTYOmCCkUooZ_YMFZhfnPmGgxK6Z5REHl1SYrv1yeikaG6UsfM2RzVLgbV5q4QUOTEvRSbzhDi2lTZRgULRkjxNGGgEOsQVZbLfUP5RlL5z9bX5P5uiNmnGjfWYyfiePTgyGIBw';
    try {
        
        const prompt = req.query.prompt || 'I am feeling neutral';
        const completion = await getGroqChatCompletion(prompt);
        const seed_genres = req.query.seed_genres || 'pop';

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
                target_danceability: completion.target_danceability,
                // min_energy: completion.min_energy,
                // max_energy: completion.max_energy,
                target_energy: completion.target_energy,
                // min_instrumentalness: completion.min_instrumentalness,
                // max_instrumentalness: completion.max_instrumentalness,
                target_instrumentalness: completion.target_instrumentalness,
                // min_liveness: completion.min_liveness,
                // max_liveness: completion.max_liveness,
                target_liveness: completion.target_liveness,
                // min_loudness: completion.min_loudness,
                // max_loudness: completion.max_loudness,
                target_loudness: completion.target_loudness,
                //min_key: completion.min_key,
                // max_key: completion.max_key,
                target_key: completion.target_key,
                // min_mode: completion.min_mode,
                // max_mode: completion.max_mode,
                target_mode: Math.round(completion.target_mode),
                // min_popularity: completion.min_popularity,
                // max_popularity: completion.max_popularity,
                target_popularity: completion.target_popularity,
                // min_speechiness: completion.min_speechiness,
                // max_speechiness: completion.max_speechiness,
                target_speechiness: completion.target_speechiness,
                // min_tempo: completion.min_tempo,
                // max_tempo: completion.max_tempo,
                target_tempo: completion.target_tempo,
                // min_time_signature: completion.min_time_signature,
                // max_time_signature: completion.max_time_signature,
                target_time_signature: completion.target_time_signature,
                // min_valence: completion.min_valence,
                // max_valence: completion.max_valence,
                target_valence: completion.target_valence,

            }
        });


        const parsedTracks = parseSpotifyResponse(response.data);
        await insertSongs(parsedTracks);
        res.json(parsedTracks);
        
    } catch (error) {
        console.error('Error in /recommend route:', error);
        res.json({error: error});
    }
});
module.exports = router;
