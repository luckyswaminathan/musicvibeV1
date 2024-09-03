'use client';
import './musicvibe.css';
import React from 'react';
import { Button } from "@/components/button"

function handleClick() {

    window.location.href = "/"; // Redirect to the home page
}

export default function MusicVibe() {
    return (
        <div>
            <Button variant="ghost" onClick={handleClick}> MusicVibe </Button>
        </div>
    );
}