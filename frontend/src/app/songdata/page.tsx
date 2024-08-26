import HomeButton from './homebutton';
import SongsRenderServer from './songs-render-server';
export default function SongsPage() {
    return <>
        <h1 className='header'>Top Songs</h1>
        <SongsRenderServer />
        <HomeButton />
    </>
}