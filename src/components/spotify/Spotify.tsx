import classes from './Spotify.module.css';
import { useEffect, useState } from 'react';

const DISCORD_ID = '316947490991636482';

interface SpotifyData {
	song: string;
	artist: string;
	album: string;
	album_art_url: string;
	track_id: string;
}

export const Spotify = () => {
	const [spotify, setSpotify] = useState<SpotifyData | null>(null);

	console.log(spotify);

	useEffect(() => {
		const ws = new WebSocket('wss://api.lanyard.rest/socket');

		ws.onopen = () => {
			console.log('✅ WebSocket connected');
			ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
		};

		ws.onmessage = event => {
			const data = JSON.parse(event.data);
			if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
				setSpotify(data.d.spotify || null);
			}
		};

		ws.onclose = () => console.log('🔴 WebSocket disconnected');

		return () => ws.close(); // Закриваємо WebSocket при виході
	}, []);

	if (!spotify) return null;

	if (spotify)
		return (
			<div className={classes.spotify}>
				<h2>Now listening to:</h2>
				<img src={spotify.album_art_url ?? ''} alt={spotify.album} />

				<div className={classes.playing}>
					<div className={classes.rect1}></div>
					<div className={classes.rect2}></div>
					<div className={classes.rect3}></div>
					<div className={classes.rect4}></div>
					<div className={classes.rect5}></div>
				</div>
				<div className={classes.info}>
					<a
						href={`https://open.spotify.com/track/${spotify.track_id}`}
						target='_blank'
						rel='noreferrer'
					>
						{spotify.song}
					</a>
					<p>{spotify.artist}</p>
				</div>
			</div>
		);
};
