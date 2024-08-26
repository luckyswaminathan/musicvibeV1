
export type User = {
    id: string,
    first_name?: string,
    last_name?: string,
    refresh_token?: string,
}

export type Song = {
    song_id: string,
    song_name: string,
    user_id: string,
    preview_link: string,
    artist: string
}

