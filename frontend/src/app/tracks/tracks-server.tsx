
const axios = require('axios');
import TracksClient from './tracks-client';
import {Track} from './track';

export async function getTracks({access_token}: {access_token: string}) {
    const res = await axios.get('http://localhost:3001/api/songs/top', {access_token: access_token})
    return res.data
}

export default function TracksServer({access_token}: {access_token: string}) {
    const tracks = getTracks({access_token: access_token});

    return <TracksClient tracks={tracks} />
}

