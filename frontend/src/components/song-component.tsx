'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/button"  // Make sure this path is correct
import SongImage from "@/components/song-image";
import { Input } from "@/components/ui/input"
import Prompt from "@/components/prompt"
import { ComboboxGenres } from './playlist-component';
import './song-component.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

const supabase = createClientComponentClient();

function SongComponent({ name, url }: { name: string, url: string }) {
    const [prompt, setPrompt] = useState('');
    const [playlistLink, setPlaylistLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [genre, setGenre] = useState('');

    useEffect(() => {
        async function getUserId() {
            const { data: { session } } = await supabase.auth.getSession();
            console.log('Session:', session);
            if (session) {
                setUserId(session.user.id);
                console.log('User ID set:', session.user.id);
            } else {
                console.log('No active session found');
            }
        }
        getUserId();
    }, []);

    async function handleGenerate() {
        console.log('Generate button clicked');
        console.log('User ID:', userId);
        console.log('Prompt:', prompt);
        console.log('Genre:', genre);
        if (!genre) {
            setGenre('pop');
        }

        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Sending request to backend');
            const response = await axios.post(
                `http://localhost:3001/api/songs/recommend?userId=${userId}&prompt=${encodeURIComponent(prompt)}&seed_genres=${genre}`,
                {} // Empty body, as we're sending data via query params
            );
            console.log('Response from backend:', response.data.playlistUrl);
            setPlaylistLink(response.data.playlistUrl);
        } catch (error) {
            console.error('Error generating playlist:', error);
        }
        setIsLoading(false);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop:'30px' }}>
            <SongImage image={url} />
            <div className="flex w-full max-w-sm items-center space-x-2">
                <ComboboxGenres value={genre} setValue={setGenre} />
                <Input 
                    type="text" 
                    placeholder="I want a song about ..." 
                    style={{width: '300px'}}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                    onClick={handleGenerate} 
                    disabled={isLoading || !userId}
                    className="bg-[#E94824] w-[150px] rounded-[30px]"
                >
                    {isLoading ? 'Generating...' : 'Generate'}
                </Button>
            </div>
            {!userId && <p>Please log in to generate a playlist</p>}
            {isLoading && <p>Generating your playlist...</p>}
            {playlistLink && (
                <div>
                    <Button 
                    variant="default" 
                    style={{backgroundColor: 'black', color: 'white', borderRadius: '10px'}}
                    className="hover:bg-gray-800"
                    >
                    <a href={playlistLink} target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'none'}}>
                        Listen on Spotify
                    </a>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SongComponent;