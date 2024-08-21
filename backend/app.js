// Code to run the server
const supabase = require('./supabase')
require('dotenv').config()
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const express = require('express')
const cors = require('cors')
const app = express()
const router = express.Router();
const PORT = 3001
const songRoutes = require('./routes/songs/songRoutes')
const authRoutes = require('./routes/auth/login')
app.use(cors())
app.use(express.json())


async function signInWithSpotify() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
    })
  }


app.get('/', (req, res) => {
    res.send('Hello World')
});

/**
 * @swagger
 * /login:
 *  post:
 *  summary: Sign in with Spotify
 *  responses:
 *     200:
 *      description: Sign in with Spotify
 */
app.use('/api/auth', authRoutes)
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use('/api/songs', songRoutes);
app.listen(3001, () => {
    console.log(`Server is running on port 3001`)
    });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));





