'use client'
import React from 'react';
import { Button } from "@/components/button"
import SongImage from "@/components/song-image";
import { Input } from "@/components/ui/input"
import Prompt from "@/components/prompt"
import './song-component.css';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

function handleClick() {
    
}
function SongComponent({ name, url, access_token }: { name: string, url: string, access_token: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop:'30px' }}>
            <SongImage image={url} />
            <Prompt text={"sample prompt"}/>
            <div className="flex w-full max-w-sm items-center space-x-2">
    
            
            <Input type="text" placeholder="answer here!" style={{width: '300px'}}></Input>
            <Button>Generate</Button>
            </div>
        </div>
    )
}

export default SongComponent;