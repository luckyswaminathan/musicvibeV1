'use client';
import React from 'react';
import { Track } from './track'

function TracksClient({tracks}: {tracks: Track[]}) {
    return (
        <div>
            <h1>Top Tracks</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>{track.name}</li>
                ))}
            </ul>
        </div>
    )
}
export default TracksClient;