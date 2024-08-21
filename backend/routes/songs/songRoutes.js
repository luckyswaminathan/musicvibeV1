const express = require('express');
const router = express.Router();
const axios = require('axios');
const access_token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjlWZlhvZXk2MFRMREVZTVgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3Rlb3B0bHNrd2ZzcWF5cGhndWVoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIxNzYwMTlkOC04ODFmLTRmNWQtYjYzMi1hZDYwM2VmMTcxYjQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI0MjE0MTY5LCJpYXQiOjE3MjQyMTA1NjksImVtYWlsIjoibGFrc2htYW4uc3dhbWluYXRoYW4xQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ2l0aHViIiwicHJvdmlkZXJzIjpbImdpdGh1YiJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzUzMTMyNDE2P3Y9NCIsImVtYWlsIjoibGFrc2htYW4uc3dhbWluYXRoYW4xQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiJMYWtzaG1hbiBTd2FtaW5hdGhhbiIsImlzcyI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20iLCJuYW1lIjoiTGFrc2htYW4gU3dhbWluYXRoYW4iLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6Imx1Y2t5c3dhbWluYXRoYW4iLCJwcm92aWRlcl9pZCI6IjUzMTMyNDE2Iiwic3ViIjoiNTMxMzI0MTYiLCJ1c2VyX25hbWUiOiJsdWNreXN3YW1pbmF0aGFuIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MjQyMTA1Njl9XSwic2Vzc2lvbl9pZCI6ImQxOTkxZGYwLWI2ZDQtNDJjZS1hYjY2LWM3MmVhNGM5ZDJkOCIsImlzX2Fub255bW91cyI6ZmFsc2V9.nf3sEujWTU4-IhiR7PC-rdzKEml8nr9U3chBGs-oXf8'
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
    const access_token = req.headers.authorization?.split(' ')[1];
    
    if (!access_token) {
        return res.status(401).json({ error: 'Access token is missing' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return res.status(200).json(response.data);
    } catch (err) {
        console.error('Error fetching top tracks:', err.message);
        return res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
});

module.exports = router;
