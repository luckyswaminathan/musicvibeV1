'use client';
import '../musicvibe.css';
import React from 'react';
import { Button } from "@/components/button"

function handleClick() {

    window.location.href = "/"; // Redirect to the home page
}

export default function MusicVibe() {
    return (

        <div>
            <a  href="/" className='bubbly-font'> 
            {'MusicVibe'.split('').map((letter, index) => (
          <span key={index} className="wavy-letter">{letter}</span>
        ))} </a>
        </div>
    );
}