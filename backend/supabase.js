const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient("https://teoptlskwfsqayphgueh.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlb3B0bHNrd2ZzcWF5cGhndWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1OTEwMDYsImV4cCI6MjAzOTE2NzAwNn0.7cmnfnMr-3ZmBcSCAddPXjvM8jfFXgyTDrEGhATpM28');

module.exports = supabase;