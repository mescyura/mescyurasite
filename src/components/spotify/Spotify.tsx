import { useTilt } from '../../hooks/useTilt';
import { Translations } from '../../interfaces';
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
	const tilt = useTilt();

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
		<div
			ref={tilt.ref}
			onMouseMove={tilt.onMouseMove}
			onMouseLeave={tilt.onMouseLeave}
			style={tilt.style}
			className='flex w-full flex-col gap-2 self-start sm:w-auto'
		>
			{spotify ? (
				<a
					href={`https://open.spotify.com/track/${spotify.track_id}`}
					target='_blank'
					rel='noreferrer'
				>
					<div className='flex h-[65px] w-full max-w-full items-center gap-3 rounded-2xl bg-black/5 px-4 py-2 backdrop-blur dark:bg-white/10 sm:w-[300px] sm:max-w-[300px]'>
						<div className='flex h-[30px] items-end gap-0.5 self-center'>
							{[...Array(8)].map((_, i) => (
								<div
									key={i}
									className='h-full w-0.5 origin-bottom rounded-sm bg-[#56b35f] animate-[wavy_1s_ease-in-out_infinite]'
									style={{ animationDelay: `${i * 0.2}s` }}
								/>
							))}
						</div>

						<img
							src={spotify.album_art_url}
							alt={spotify.album}
							className='h-10 w-10 rounded-md object-cover'
						/>

						<div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
							<p className='truncate text-xs text-zinc-900 dark:text-zinc-50'>
								{spotify.song}
							</p>
							<p className='truncate text-[10px] text-zinc-600 dark:text-zinc-300'>
								{spotify.artist}
							</p>

							<div className='mt-0.5 flex justify-between text-[10px] text-zinc-900/60 tabular-nums dark:text-zinc-50/60'>
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>

							<div className='mt-1 h-1 w-full overflow-hidden rounded-full bg-zinc-900/20 dark:bg-white/20'>
								<div
									className='h-full origin-left rounded-full bg-linear-to-r from-[#1db954] to-[#56b35f]/70'
									style={{ transform: `scaleX(${progress})` }}
								/>
							</div>
						</div>
					</div>
				</a>
			) : (
				<div className='flex h-[65px] w-full max-w-full items-center gap-3 rounded-2xl border border-dashed border-zinc-900/20 bg-black/5 px-4 py-2 opacity-80 dark:border-white/20 dark:bg-white/10 sm:w-[300px] sm:max-w-[300px]'>
					<div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/10'>
						<svg
							stroke='currentColor'
							fill='currentColor'
							strokeWidth='0'
							role='img'
							className='h-10 w-10 text-[#1db954]'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title></title>
							<path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z'></path>
						</svg>
					</div>
					<div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
						<p className='truncate text-xs text-zinc-900 dark:text-zinc-50'>
							{translations[language].spotify.title}
						</p>
						<p className='truncate text-[10px] text-zinc-600 dark:text-zinc-300'>
							{translations[language].spotify.listening}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
