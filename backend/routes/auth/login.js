const { Router } = require('express');
const cors = require('cors');
const axios = require('axios');
const supabase = require('../../supabase');
const querystring = require('querystring');


const router = Router();
router.use(cors());
function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }
client_id = 'dc023414ef984d4cb0eb8578dca17ffc';
client_secret = 'e5adf81fcc114847999b33be007b32c0';
redirect_uri = 'http://localhost:3001/api/auth/callback';
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in the user and returns authentication tokens and redirect URI
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grant_token:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 redirect_uri:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.get('/login', async function(req, res) {
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
  
    const url = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      });
    res.redirect(url);
  });

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not found' });
  }
  
  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    const { access_token, refresh_token, expires_in } = tokenResponse.data;
  
      // Return the tokens and other necessary data as JSON to the frontend
    return res.json({
      access_token: access_token,
      refresh_token: refresh_token,
      expires_in: expires_in,
    });
  } catch (error) {
    console.error('Error exchanging authorization code for token:', error);
    return res.status(500).json({ error: 'Failed to exchange authorization code for token' });
  }
});
module.exports = router;