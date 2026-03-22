// import classes from './Loader.module.css';

// const Loader = () => {
// 	return (
// 		<div className={classes.loader_overlay}>
// 			<div className={classes.spinner}>
// 				<div className={classes.spinner_circle}></div>
// 				<div className={classes.spinner_circle}></div>
// 				<div className={classes.spinner_circle}></div>
// 			</div>
// 		</div>
// 	);
// };

// export default Loader;

//new loader

import { useEffect, useState } from 'react';
import classes from './Loader.module.css';
import Disc from './Disc';

type Props = {
	onFinish: () => void;
};

export default function Loader({ onFinish }: Props) {
	const [started, setStarted] = useState(false);
	const [phase, setPhase] = useState<'boot' | 'disk' | 'ready'>('boot');
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!started) return;

		const audio = new Audio('/ps1.mp3');
		audio.volume = 0.6;
		audio.play().catch(() => {});

		// 0–2с → boot
		setTimeout(() => setPhase('disk'), 2000);

		// 2–13с → диск крутиться
		const duration = 8000;
		const start = Date.now();

		const interval = setInterval(() => {
			const elapsed = Date.now() - start;
			const percent = Math.min((elapsed / duration) * 100, 100);
			setProgress(Math.floor(percent));

			if (percent >= 100) {
				clearInterval(interval);
				setPhase('ready');
				setTimeout(() => onFinish(), 1000);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [started, onFinish]);

	if (!started) {
		return (
			<div className={classes.overlay} onClick={() => setStarted(true)}>
				<div className={classes.startBox}>
					<p className={classes.start}>▶ Power On</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`${classes.container} ${phase === 'ready' ? classes.fadeOut : ''}`}
		>
			<div className={classes.crt} />

			{phase === 'boot' && (
				<div className={classes.boot}>
					<p className={classes.bootSub}>Initializing...</p>
				</div>
			)}

			{phase === 'disk' && (
				<div className={classes.content}>
					{/* <svg className={classes.diskSvg}>
						<use href={image + '#svg1681'} />
					</svg> */}

					<Disc className={classes.diskSvg} />

					<p className={classes.status}>Loading system...</p>
					<div className={classes.progressBar}>
						<div
							className={classes.progressFill}
							style={{ width: `${progress}%` }}
						/>
					</div>
					<p className={classes.percent}>{progress}%</p>
				</div>
			)}
		</div>
	);
}
