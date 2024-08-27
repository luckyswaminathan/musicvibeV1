'use client';

import { useState, useEffect } from 'react';

export default function PlaylistPage() {
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/songs/recommend?userId=1');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPlaylistData(data);
        } catch (e) {
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    fetchPlaylist();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Playlist Data</h1>
      <pre>{JSON.stringify(playlistData, null, 2)}</pre>
    </div>
  );
}