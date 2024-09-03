'use client';

import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,

} from "@/components/ui/hover-card";
import { Playlist } from '../../types/Playlist';
import PlaylistComponent from '@/components/playlistcomponent';
import MusicVibe from '@/ui/musicvibe/musicvibe';
const axios = require('axios');
const supabase = createClientComponentClient();

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPlaylists() {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          throw new Error('No active session found');
        }

        const userId = session.user.id;
        const response = await axios.get(`http://localhost:3001/api/playlists/list?userId=${userId}`);
        console.log('Response:', response.data);
        
        // Manually map the response data to the Playlist type
        const data = response.data;
        const formattedPlaylists: Playlist[] = response.data.formattedPlaylists;
        console.log('Formatted playlists:', formattedPlaylists);

        setPlaylists(formattedPlaylists);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        setError('Failed to fetch playlists');
      } finally {
        setLoading(false);
      }
    }

    getPlaylists();
  }, []);

  if (loading) return <div>Loading playlists...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="container mx-auto p-4">
      <div className="flex"> <MusicVibe></MusicVibe><h1 className="text-2xl font-bold mb-6">Your Playlists</h1></div>
      <Accordion type="single" collapsible>
        {playlists.map((playlist) => (
          <AccordionItem key={playlist.playlistId} value={playlist.playlistId}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center w-full">
                {playlist.cover_image_url && (
                  <img
                    src={playlist.cover_image_url}
                    alt={playlist.name}
                    width={50}
                    height={50}
                    className="rounded-md mr-4"
                  />
                )}
                <h3 className="text-lg font-semibold">{playlist.name}</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-gray-100 rounded-md">
                <p>Created at: {new Date(playlist.created_at).toLocaleString()}</p>
                {/* Add more details here if needed */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    </div>
  );
}