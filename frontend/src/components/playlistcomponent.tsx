'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Playlist } from "@/types/Playlist";
function PlaylistComponent({playlists}: {playlists: Playlist[]}) {
    return (
        <div>
            <Accordion type="multiple">
                <div>
                    {playlists.map(playlist => (
                        <AccordionItem key={playlist.playlistId} value={playlist.playlistId}>
                            <AccordionTrigger>
                                <h3>{playlist.name}</h3>
                            </AccordionTrigger>
                            <AccordionContent>
                                <img src={playlist.cover_image_url} alt={playlist.name} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </div>
            </Accordion>
        </div>
    )
}

export default PlaylistComponent;