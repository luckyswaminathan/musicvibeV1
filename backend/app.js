import { createClient } from '@supabase/supabase-js'

require('dotenv').config()
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())


    






