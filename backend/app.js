// Code to run the server
const supabase = require('./supabase')
require('dotenv').config()
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const express = require('express')
const cors = require('cors')
const app = express()
const songRoutes = require('./routes/songs/songRoutes')
const authRoutes = require('./routes/auth/login')
const promptRoutes = require('./routes/prompts/prompts')
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
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

app.use('/api/songs', songRoutes);
app.use('/api/prompts', promptRoutes);
app.listen(3001, () => {
    console.log(`Server is running on port 3001`)
    });

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));





