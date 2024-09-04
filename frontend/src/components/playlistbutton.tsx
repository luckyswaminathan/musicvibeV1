'use client';

import React from 'react';
import { Button } from "@/components/button"
import './musicvibe.css';

function handleClick() {

    window.location.href = "/playlists"; // Redirect to the home page
}

export default function PlaylistButton() {
    return (
        <div>
            <a  href="/playlists" className='bubbly-font'> 
            {'Playlists'.split('').map((letter, index) => (
          <span key={index} className="wavy-letter">{letter}</span>
        ))} </a>
        </div>
    );
}