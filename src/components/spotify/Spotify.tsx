import { Translations } from '../../interfaces';
import classes from './Spotify.module.css';
import { useEffect, useRef, useState } from 'react';

const DISCORD_ID = import.meta.env.VITE_DISCORD_ID;

interface SpotifyData {
	song: string;
	artist: string;
	album: string;
	album_art_url: string;
	track_id: string;
	timestamps: {
		start: number;
		end: number;
	};
}

interface Props {
	translations: Translations;
	language: string;
}

export const Spotify = ({ translations, language }: Props) => {
	const [spotify, setSpotify] = useState<SpotifyData | null>(null);
	const [progress, setProgress] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const rafRef = useRef<number | null>(null);
	const lastSecondRef = useRef<number>(-1);

	// WebSocket
	useEffect(() => {
		const ws = new WebSocket('wss://api.lanyard.rest/socket');

		ws.onopen = () => {
			ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
		};

		ws.onmessage = event => {
			const data = JSON.parse(event.data);

			if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
				const newSpotify = data.d.spotify || null;

				setSpotify(newSpotify);

				// 🔄 reset при новому треку
				if (newSpotify) {
					lastSecondRef.current = -1;
					setCurrentTime(0);
					setProgress(0);
				}
			}
		};

		return () => ws.close();
	}, []);

	useEffect(() => {
		if (!spotify) return;

		const start = spotify.timestamps.start;
		const end = spotify.timestamps.end;
		const duration = end - start;

		const update = () => {
			const now = Date.now();

			let current = now - start;

			if (current < 0) current = 0;

			if (current >= duration) {
				setCurrentTime(duration);
				setProgress(1);
				return;
			}

			setProgress(current / duration);

			const currentSecond = Math.floor(current / 1000);

			if (currentSecond !== lastSecondRef.current) {
				lastSecondRef.current = currentSecond;
				setCurrentTime(current);
			}

			rafRef.current = requestAnimationFrame(update);
		};

		rafRef.current = requestAnimationFrame(update);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [spotify]);

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const duration = spotify
		? spotify.timestamps.end - spotify.timestamps.start
		: 0;

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
						? translations[language].spotify.title
						: translations[language].spotify.not_listening}
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
							<div className={classes.rect6}></div>
							<div className={classes.rect7}></div>
							<div className={classes.rect8}></div>
						</div>

						<img src={spotify.album_art_url} alt={spotify.album} />

						<div className={classes.info}>
							<p className={classes.song}>{spotify.song}</p>
							<p className={classes.artist}>{spotify.artist}</p>

							{/* ⏱ realtime */}
							<div className={classes.time}>
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>

							{/* 📊 progress */}
							<div className={classes.progress}>
								<div
									className={classes.progress_fill}
									style={{ width: `${progress * 100}%` }}
								/>
							</div>
						</div>
					</div>
				</a>
			)}
		</div>
	);
};
