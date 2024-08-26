'use client'
import React from 'react';



const SongImage: React.FC<{ image: string }> = ({ image }) => {
    return (
        <div>
            <img style={{ width: '300px' }} src={"https://i.scdn.co/image/ab67616d0000b2733f203b8d0d8e54fab416a825"} alt="Song Image" />
        </div>
    );
    };
    
export default SongImage;