import { Translations } from '../interfaces';

import dd from '../assets/deren-desktop.webp';
import dm from '../assets/deren-mobile.webp';
import md from '../assets/meyes-desktop.webp';
import mm from '../assets/meyes-mobile.webp';
import sbd from '../assets/shopbakery-desktop.webp';
import sbm from '../assets/shopbakery-mobile.webp';
import doed from '../assets/doe-desktop.webp';
import todod from '../assets/todoapp-desktop.webp';
import todom from '../assets/todoapp-mobile.webp';
import { CiDesktop, CiMobile1 } from 'react-icons/ci';
import { useCallback, useState } from 'react';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

const portfolioModalMotion: Variants = {
	hidden: {
		opacity: 0,
		y: '-100%',
		filter: 'blur(14px)',
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: 0.48,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	leave: {
		opacity: 0,
		y: '-35%',
		filter: 'blur(12px)',
		transition: {
			duration: 0.36,
			ease: [0.45, 0, 0.55, 1],
		},
	},
};

interface PortfolioItemModalProps {
	view: boolean;
	mobile?: string;
	desktop?: string;
	setPicture: (name: string) => void;
	onClose: () => void;
}

export const PortfolioItemModal = ({
	view,
	mobile,
	desktop,
	setPicture,
	onClose,
}: PortfolioItemModalProps) => {
	return (
		<motion.div
			className='fixed inset-0 z-1000 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden border border-zinc-900/10 bg-white px-4 py-10 will-change-transform dark:border-white/10 dark:bg-zinc-950'
			variants={portfolioModalMotion}
			initial='hidden'
			animate='visible'
			exit='leave'
			role='dialog'
			aria-modal='true'
			aria-label='Project preview'
		>
			<button
				type='button'
				className='absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-black/5 dark:text-zinc-50 dark:hover:bg-white/10'
				onClick={onClose}
				aria-label='close modal'
			>
				<FiX className='h-6 w-6 stroke-[2.5]' aria-hidden />
			</button>
			<div className='flex items-center justify-center gap-2'>
				{desktop && (
					<CiDesktop
						onClick={() => setPicture('desktop')}
						className={
							view
								? 'h-10 w-10 cursor-pointer rounded-full p-2 text-zinc-500 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10'
								: 'h-10 w-10 cursor-pointer rounded-full border border-zinc-900/10 bg-black/5 p-2 text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50'
						}
					/>
				)}
				{mobile && (
					<CiMobile1
						onClick={() => setPicture('mobile')}
						className={
							view
								? 'h-10 w-10 cursor-pointer rounded-full border border-zinc-900/10 bg-black/5 p-2 text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50'
								: 'h-10 w-10 cursor-pointer rounded-full p-2 text-zinc-500 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10'
						}
					/>
				)}
			</div>
			<div className='flex h-[80%] min-h-0 w-full select-none items-center justify-center overflow-hidden'>
				<AnimatePresence mode='wait' initial={false}>
					<motion.img
						key={view ? 'mobile' : 'desktop'}
						src={view ? mobile : desktop}
						alt=''
						className='h-full w-full object-contain'
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						loading='eager'
						decoding='async'
						fetchpriority='high'
						sizes='85vw'
					/>
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

const GRID_IMG_SIZES =
	'(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) min(50vw - 1.5rem, 420px), min(360px, 33vw)';

interface PortfolioProps {
	project: {
		name: string;
		href?: string;
		tools: string[];
		description: string;
	};
	mobile?: string;
	desktop?: string;
	/** Перші картки — eager/high для LCP; решта lazy. */
	priority?: boolean;
}

export const PortfolioItem = ({
	project,
	mobile,
	desktop,
	priority = false,
}: PortfolioProps) => {
	const [view, setView] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	function modalOpen() {
		setIsModalOpen(true);
		document.body.classList.toggle('is-scroll-disabled');
	}

	function modalCLose() {
		setIsModalOpen(false);
		document.body.classList.toggle('is-scroll-disabled');
	}

	function setPicture(name: string) {
		if (name === 'desktop' && view != false) {
			setView(false);
		}

		if (name === 'mobile' && view != true) {
			setView(true);
		}
	}

	/** Підвантажує протилежний варіант у фоні — перемикання без затримки. */
	const prefetchOppositeVariant = useCallback(() => {
		const hidden = view ? desktop : mobile;
		if (!hidden) return;
		const img = new Image();
		img.src = hidden;
	}, [view, desktop, mobile]);

	return (
		<>
			<motion.div
				className='flex h-full flex-col items-start gap-2 rounded-3xl border border-zinc-900/10 bg-white/60 p-4 text-zinc-900 backdrop-blur-xl transition-transform hover:-translate-y-0.5 hover:border-zinc-900/30 dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:border-white/30'
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.25, ease: 'easeOut' }}
				onPointerEnter={prefetchOppositeVariant}
			>
				<div className='flex items-center justify-center'>
					<h1 className='text-base font-medium leading-5'>{project.name}</h1>
					<a
						href={project.href}
						target='_blank'
						rel='noreferrer'
						className='ml-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10'
					>
						{project.href ? (
							<FiExternalLink className='h-4 w-4 stroke-zinc-400 transition-colors hover:stroke-zinc-900 dark:hover:stroke-zinc-50' />
						) : (
							<FiExternalLink className='h-4 w-4 cursor-not-allowed stroke-zinc-400' />
						)}
					</a>
				</div>
				<div
					className='flex min-h-[180px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl'
					onClick={modalOpen}
					role='button'
					tabIndex={0}
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							modalOpen();
						}
					}}
					aria-label={`${project.name} — enlarge preview`}
				>
					<img
						src={view ? mobile : desktop}
						alt={`${project.name} preview`}
						className='h-auto w-full max-h-[200px] object-contain'
						loading={priority ? 'eager' : 'lazy'}
						decoding='async'
						fetchpriority={priority ? 'high' : 'low'}
						sizes={GRID_IMG_SIZES}
					/>
				</div>
				<div className='flex w-full items-center justify-center'>
					<div className='flex items-center justify-center gap-2'>
						{desktop && (
							<CiDesktop
								onClick={() => setPicture('desktop')}
								className={
									view
										? 'h-10 w-10 cursor-pointer rounded-full p-2 text-zinc-500 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10'
										: 'h-10 w-10 cursor-pointer rounded-full border border-zinc-900/10 bg-black/5 p-2 text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50'
								}
							/>
						)}
						{mobile && (
							<CiMobile1
								onClick={() => setPicture('mobile')}
								className={
									view
										? 'h-10 w-10 cursor-pointer rounded-full border border-zinc-900/10 bg-black/5 p-2 text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-50'
										: 'h-10 w-10 cursor-pointer rounded-full p-2 text-zinc-500 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10'
								}
							/>
						)}
					</div>
				</div>
				<div className='flex flex-wrap items-center gap-2'>
					{project.tools.map(tool => (
						<div
							key={tool}
							className='rounded-full bg-black/5 px-3 py-2 text-[10px] font-semibold text-zinc-900 dark:bg-white/10 dark:text-zinc-50'
						>
							{tool}
						</div>
					))}
				</div>
				<p className='text-pretty text-xs font-normal text-zinc-900 dark:text-zinc-50'>
					{project.description}
				</p>
			</motion.div>
			<AnimatePresence>
				{isModalOpen && (
					<PortfolioItemModal
						key={project.name}
						view={view}
						mobile={mobile}
						desktop={desktop}
						setPicture={setPicture}
						onClose={modalCLose}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

interface Props {
	translations: Translations;
	language: string;
}

export const Portfolio = ({ translations, language }: Props) => {
	const items = [
		{
			key: 'deren',
			project: translations[language].portfolio.projects['deren'],
			mobile: dm,
			desktop: dd,
		},
		{
			key: 'meyes',
			project: translations[language].portfolio.projects['meyes'],
			mobile: mm,
			desktop: md,
		},
		{
			key: 'doe',
			project: translations[language].portfolio.projects['doe'],
			desktop: doed,
		},
		{
			key: 'shop-bakery',
			project: translations[language].portfolio.projects['shop-bakery'],
			mobile: sbm,
			desktop: sbd,
		},
		{
			key: 'todo-app',
			project: translations[language].portfolio.projects['todo-app'],
			mobile: todom,
			desktop: todod,
		},
	] as const;

	return (
		<motion.section
			className='w-full pb-8 pt-32 text-zinc-900 dark:text-zinc-50'
			initial='hidden'
			animate='show'
			variants={{
				hidden: { opacity: 0 },
				show: { opacity: 1, transition: { staggerChildren: 0.08 } },
			}}
		>
			<motion.div
				className='mb-4 flex items-center gap-2'
				variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
			>
				<h1 className='text-[26px] leading-none'>
					{translations[language].portfolio.title} 💻
				</h1>
			</motion.div>
			<motion.p
				className='mb-5 text-sm text-zinc-700 dark:text-zinc-300'
				variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
			>
				{translations[language].portfolio.subtitle}
			</motion.p>
			<motion.div
				className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2'
				variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
			>
				{items.map((item, idx) => {
					const isLast = idx === items.length - 1;
					const shouldSpanFull = isLast && items.length % 2 === 1;

					return (
						<div
							key={item.key}
							className={shouldSpanFull ? 'col-span-full' : undefined}
						>
							<PortfolioItem
								project={item.project}
								mobile={'mobile' in item ? item.mobile : undefined}
								desktop={'desktop' in item ? item.desktop : undefined}
								priority={idx < 2}
							/>
						</div>
					);
				})}
			</motion.div>
		</motion.section>
	);
};
