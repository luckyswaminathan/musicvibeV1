
import MusicVibe from "./musicvibe/musicvibe";
import AuthButtonServer from "@/ui/navbar/auth-button-server";
import PlaylistButton from "@/components/playlistbutton";

export default function NavigationBarLogin() {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px', marginLeft: '50px 0', gap: '200px' }}>
                <MusicVibe />

            
                <PlaylistButton />
                <AuthButtonServer />
            </div>

        </div>
    )
} 