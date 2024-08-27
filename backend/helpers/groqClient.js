
const Groq = require('groq-sdk');

const groq = new Groq({apiKey: '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'});

function extractParameter(content, parameterName) {
    // Create a regular expression pattern that looks for the specific parameter
    const regex = new RegExp(`\\*\\*${parameterName}\\*\\*: ([\\d.]+)`);
    const match = content.match(regex);
    
    // If a match is found, parse and return the value; otherwise, return null
    if (match && match[1]) {
        const value = match[1];
        return value.includes('.') ? parseFloat(value) : parseInt(value);
    }
    return null;
}

async function generatePrompt() {
    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Generate a neutral prompt that can be answered to create a Spotify playlist."
            }
        ],
        model: "llama3-8b-8192"
    });

    return response.choices[0]?.message?.content;
}

async function getGroqChatCompletion(prompt) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:`You are an AI that generates Spotify recommendation API parameters based on a sentiment analysis of text. 

        Given the following prompt:
        
        "${prompt}"
  
        For the following tunable track attributes, generate wide parameter (meaning that all ranges aren't fully restrictive) values within the specified ranges:

    - **min_acousticness**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_acousticness**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_acousticness**: (Range: 0 - 1, a target value for the track attribute)

    - **min_danceability**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_danceability**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_danceability**: (Range: 0 - 1, a target value for the track attribute)

    - **min_duration_ms**: (An integer representing the minimum duration of the track in milliseconds)
    - **max_duration_ms**: (An integer representing the maximum duration of the track in milliseconds)
    - **target_duration_ms**: (An integer representing the target duration of the track in milliseconds)

    - **min_energy**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_energy**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_energy**: (Range: 0 - 1, a target value for the track attribute)

    - **min_instrumentalness**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_instrumentalness**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_instrumentalness**: (Range: 0 - 1, a target value for the track attribute)

    - **min_key**: (Range: 0 - 11, an integer representing the minimum key of the track)
    - **max_key**: (Range: 0 - 11, an integer representing the maximum key of the track)
    - **target_key**: (Range: 0 - 11, an integer representing the target key of the track)

    - **min_liveness**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_liveness**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_liveness**: (Range: 0 - 1, a target value for the track attribute)

    - **min_loudness**: (A number representing the minimum loudness of the track in decibels, can be negative)
    - **max_loudness**: (A number representing the maximum loudness of the track in decibels)
    - **target_loudness**: (A number representing the target loudness of the track in decibels)

    - **min_mode**: (Range: 0 - 1, an integer representing the minimum mode of the track)
    - **max_mode**: (Range: 0 - 1, an integer representing the maximum mode of the track)
    - **target_mode**: (Range: 0 - 1, an integer representing the target mode of the track)

    - **min_popularity**: (Range: 0 - 100, an integer representing the minimum popularity of the track)
    - **max_popularity**: (Range: 0 - 100, an integer representing the maximum popularity of the track)
    - **target_popularity**: (Range: 0 - 100, an integer representing the target popularity of the track)

    - **min_speechiness**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_speechiness**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_speechiness**: (Range: 0 - 1, a target value for the track attribute)

    - **min_tempo**: (A number representing the minimum tempo of the track in beats per minute)
    - **max_tempo**: (A number representing the maximum tempo of the track in beats per minute)
    - **target_tempo**: (A number representing the target tempo of the track in beats per minute)

    - **min_time_signature**: (Range: 0 - 11, an integer representing the minimum time signature of the track)
    - **max_time_signature**: (Range: 0 - 11, an integer representing the maximum time signature of the track)
    - **target_time_signature**: (Range: 0 - 11, an integer representing the target time signature of the track)

    - **min_valence**: (Range: 0 - 1, a hard floor on the selected track attribute's value)
    - **max_valence**: (Range: 0 - 1, a hard ceiling on the selected track attribute's value)
    - **target_valence**: (Range: 0 - 1, a target value for the track attribute)`,
        },
    ],
    model: "llama3-8b-8192",
  });
    const content = response.choices[0]?.message?.content;

    const min_acousticness = extractParameter(content, 'min_acousticness');
    const max_acousticness = extractParameter(content, 'max_acousticness');
    const target_acousticness = extractParameter(content, 'target_acousticness');

    const min_danceability = extractParameter(content, 'min_danceability');
    const max_danceability = extractParameter(content, 'max_danceability');
    const target_danceability = extractParameter(content, 'target_danceability');

    const min_duration_ms = extractParameter(content, 'min_duration_ms');
    const max_duration_ms = extractParameter(content, 'max_duration_ms');
    const target_duration_ms = extractParameter(content, 'target_duration_ms');

    const min_energy = extractParameter(content, 'min_energy');
    const max_energy = extractParameter(content, 'max_energy');
    const target_energy = extractParameter(content, 'target_energy');

    const min_instrumentalness = extractParameter(content, 'min_instrumentalness');
    const max_instrumentalness = extractParameter(content, 'max_instrumentalness');
    const target_instrumentalness = extractParameter(content, 'target_instrumentalness');

    const min_key = extractParameter(content, 'min_key');
    const max_key = extractParameter(content, 'max_key');
    const target_key = extractParameter(content, 'target_key');

    const min_liveness = extractParameter(content, 'min_liveness');
    const max_liveness = extractParameter(content, 'max_liveness');
    const target_liveness = extractParameter(content, 'target_liveness');

    const min_loudness = extractParameter(content, 'min_loudness');
    const max_loudness = extractParameter(content, 'max_loudness');
    const target_loudness = extractParameter(content, 'target_loudness');

    const min_mode = extractParameter(content, 'min_mode');
    const max_mode = extractParameter(content, 'max_mode');
    const target_mode = extractParameter(content, 'target_mode');

    const min_popularity = extractParameter(content, 'min_popularity');
    const max_popularity = extractParameter(content, 'max_popularity');
    const target_popularity = extractParameter(content, 'target_popularity');

    const min_speechiness = extractParameter(content, 'min_speechiness');
    const max_speechiness = extractParameter(content, 'max_speechiness');
    const target_speechiness = extractParameter(content, 'target_speechiness');

    const min_tempo = extractParameter(content, 'min_tempo');
    const max_tempo = extractParameter(content, 'max_tempo');
    const target_tempo = extractParameter(content, 'target_tempo');

    const min_time_signature = extractParameter(content, 'min_time_signature');
    const max_time_signature = extractParameter(content, 'max_time_signature');
    const target_time_signature = extractParameter(content, 'target_time_signature');

    const min_valence = extractParameter(content, 'min_valence');
    const max_valence = extractParameter(content, 'max_valence');
    const target_valence = extractParameter(content, 'target_valence');

    const parameters = {
        min_acousticness,
        max_acousticness,
        target_acousticness,
        min_danceability,
        max_danceability,
        target_danceability,
        min_duration_ms,
        max_duration_ms,
        target_duration_ms,
        min_energy,
        max_energy,
        target_energy,
        min_instrumentalness,
        max_instrumentalness,
        target_instrumentalness,
        min_key,
        max_key,
        target_key,
        min_liveness,
        max_liveness,
        target_liveness,
        min_loudness,
        max_loudness,
        target_loudness,
        min_mode,
        max_mode,
        target_mode,
        min_popularity,
        max_popularity,
        target_popularity,
        min_speechiness,
        max_speechiness,
        target_speechiness,
        min_tempo,
        max_tempo,
        target_tempo,
        min_time_signature,
        max_time_signature,
        target_time_signature,
        min_valence,
        max_valence,
        target_valence
    };

    return parameters;
}

module.exports = { groq, getGroqChatCompletion, generatePrompt };