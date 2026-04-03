import { useEffect } from 'react';
import { motion } from 'framer-motion';

type Props = {
	onFinish: () => void;
	language: string;
};

const Loader = ({ onFinish, language }: Props) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onFinish();
		}, 1000);

		return () => clearTimeout(timer);
	}, [onFinish]);

	return (
		<motion.div
			className='fixed inset-0 z-9999 flex origin-top items-center justify-center bg-white/70 backdrop-blur-xl dark:bg-zinc-950/60'
			initial={{ opacity: 0, y: 0, scaleY: 1 }}
			animate={{ opacity: 1, y: 0, scaleY: 1 }}
			exit={{ opacity: 0, y: '-100%', scaleY: 0.85 }}
			transition={{ duration: 0.45, ease: 'easeInOut' }}
		>
			<div className='flex flex-col items-center justify-center gap-5'>
				<div className='flex items-center justify-center gap-2'>
					{[0, 1, 2].map(i => (
						<motion.div
							key={`bubble-${i}`}
							className='h-2.5 w-2.5 rounded-full bg-zinc-900/80 dark:bg-zinc-50/80'
							animate={{ y: [0, -6, 0], scale: [1, 1.15, 1], opacity: [0.55, 1, 0.55] }}
							transition={{
								duration: 0.9,
								repeat: Infinity,
								ease: 'easeInOut',
								delay: i * 0.12,
							}}
						/>
					))}
				</div>

				<p className='text-xs font-medium tracking-wide text-zinc-700 dark:text-zinc-300'>
					{language === 'ua' ? 'Завантаження…' : 'Loading…'}
				</p>
			</div>
		</motion.div>
	);
};

export default Loader;
