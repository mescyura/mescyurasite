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

	useEffect(() => {
		const ws = new WebSocket('wss://api.lanyard.rest/socket');

		ws.onopen = () => {
			// console.log('✅ WebSocket connected');
			ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
		};

		ws.onmessage = event => {
			const data = JSON.parse(event.data);
			if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
				setSpotify(data.d.spotify || null);
			}
		};

		// ws.onclose = () => console.log('🔴 WebSocket disconnected');

		return () => ws.close(); // Закриваємо WebSocket при виході
	}, []);

	return (
		<div className={classes.spotify}>
			<div className={classes.spotify_header}>
				<svg
					stroke='currentColor'
					fill='currentColor'
					strokeWidth='0'
					role='img'
					style={{ color: 'var(--spotify)', stroke: 'var(--spotify)' }}
					viewBox='0 0 24 24'
					height='1em'
					width='1em'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title></title>
					<path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z'></path>
				</svg>
				<h2>
					{spotify
						? 'Currently listening on Spotify :'
						: 'Currently not listening to Spotify'}
				</h2>
			</div>
			{spotify && (
				<a
					href={`https://open.spotify.com/track/${spotify.track_id}`}
					target='_blank'
					rel='noreferrer'
				>
					<div className={classes.song_wrapper}>
						<div className={classes.playing}>
							<div className={classes.rect1}></div>
							<div className={classes.rect2}></div>
							<div className={classes.rect3}></div>
							<div className={classes.rect4}></div>
							<div className={classes.rect5}></div>
						</div>
						<img src={spotify.album_art_url ?? ''} alt={spotify.album} />

						<div className={classes.info}>
							<p className={classes.song}>{spotify.song}</p>
							<p className={classes.artist}>{spotify.artist}</p>
						</div>
					</div>
				</a>
			)}
		</div>
	);
};
