const express = require('express');
const router = express.Router();
const { getUserPlaylists,getPlaylistUrl } = require('./playlistHelpers');

router.get('/list', async (req, res) => {
    const userId = req.query.userId;
    const playlists = await getUserPlaylists(userId);
    res.json(playlists);
});

router.get('/url', async (req, res) => {
    const userId = req.query.userId;
    const playlistId = req.query.playlistId;
    const playlistUrl = await getPlaylistUrl(userId, playlistId);
    res.json({ playlistUrl });
});

module.exports = router;