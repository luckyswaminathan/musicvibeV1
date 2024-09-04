'use client';

import React from 'react';
import { Button } from "@/components/button"

function handleClick() {

    window.location.href = "/playlists"; // Redirect to the home page
}

export default function PlaylistButton() {
    return (
        <div>
            <Button variant="ghost" onClick={handleClick}> Playlists </Button>
        </div>
    );
}