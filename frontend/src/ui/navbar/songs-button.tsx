import React from 'react';
import Link from 'next/link';




const SongsButton: React.FC = () => {
    return (
        <Link href="/songdata">Go To My Songs</Link>
        
    );
};

export default SongsButton;
