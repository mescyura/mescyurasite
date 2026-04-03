import { Link } from 'react-router-dom';
import { Translations } from '../interfaces';
import bg from '../assets/404-bg.webp';
import { motion } from 'framer-motion';

interface Props {
	translations: Translations;
	language: string;
}

export const NotFound = ({ translations, language }: Props) => {
	return (
		<motion.section
			className='relative flex min-h-[calc(100vh-126px-2rem)] w-full items-center justify-center overflow-hidden px-6 pb-8 pt-16 text-zinc-900 dark:text-zinc-50'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.25, ease: 'easeOut' }}
		>
			<motion.div
				className='relative z-10 mx-auto flex w-full max-w-4xl flex-col items-start'
				initial='hidden'
				animate='show'
				variants={{
					hidden: { opacity: 0 },
					show: { opacity: 1, transition: { staggerChildren: 0.08 } },
				}}
			>
				<motion.h1
					className='bg-clip-text text-[9rem] font-extrabold tracking-widest text-transparent [-webkit-text-stroke:3px_#7c3aed] [-webkit-text-fill-color:transparent]'
					style={{
						backgroundImage: `url(${bg})`,
						backgroundSize: 'contain',
						backgroundPosition: '100px 20px',
					}}
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					404
				</motion.h1>
				<motion.div
					className='max-w-2xl'
					variants={{
						hidden: { opacity: 0, y: 10 },
						show: { opacity: 1, y: 0 },
					}}
				>
					<h1 className='mb-3 text-[clamp(2rem,3vw,2.6rem)] font-semibold leading-tight'>
						{translations[language].not_found.title}
					</h1>
					<p className='mb-7 text-[0.98rem] leading-7 text-slate-500 dark:text-slate-300'>
						{translations[language].not_found.subtitle}
					</p>
					<div className='flex flex-wrap gap-3'>
						<Link
							to='/'
							className='inline-flex items-center justify-center rounded-full border border-zinc-900/10 bg-black/5 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900/30 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50 dark:hover:border-white/30'
						>
							{translations[language].not_found.back_to_home}
						</Link>
						<button
							type='button'
							className='inline-flex items-center justify-center rounded-full border border-zinc-900/10 bg-transparent px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-50'
							onClick={() => window.history.back()}
						>
							{translations[language].not_found.go_back}
						</button>
					</div>
				</motion.div>
			</motion.div>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-400/20 opacity-70'
			>
				<div className='absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.18),transparent_60%)] opacity-90' />
			</div>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-[45%] -translate-y-[52%] rounded-full border border-dashed border-slate-400/25 opacity-70'
			>
				<div className='absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.3),transparent_60%)] opacity-90' />
			</div>
		</motion.section>
	);
};
