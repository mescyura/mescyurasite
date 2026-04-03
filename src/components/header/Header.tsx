import { Translations } from '../../interfaces';

import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle';
import { LanguageToggle } from '../../ui/LanguageToggle/LanguageToggle';
import { Link, useLocation } from 'react-router-dom';
import { SiGithub, SiLinkedin, SiSpotify } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import { useEffect, useState, type ReactElement } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

const MobileLandingButton = ({
	name,
	link,
	selected,
	onClick,
}: {
	name: string;
	link: string;
	selected: boolean;
	onClick: () => void;
}) => {
	return (
		<Link
			to={link}
			className={classNames(
				'flex flex-1 items-center justify-center border-b border-zinc-900/10 bg-transparent p-2 text-zinc-900 dark:border-white/10 dark:text-zinc-50',
				{
					'bg-black/10 dark:bg-white/10': selected,
				},
			)}
			onClick={onClick}
		>
			{name}
		</Link>
	);
};

interface LinkProps {
	href: string;
	icon: ReactElement;
	onClick?: () => void;
}

const LinkButton = ({ icon, href, onClick }: LinkProps) => {
	return (
		<a
			className='group flex select-none items-center justify-center rounded-full p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10'
			target='_blank'
			rel='noreferrer'
			aria-label={href}
			href={href}
			onClick={onClick}
		>
			{icon}
		</a>
	);
};

interface Props {
	toggleTheme: () => void;
	toggleLanguage: () => void;
	isDark: boolean;
	translations: Translations;
	language: string;
}

export const Header = ({
	toggleTheme,
	toggleLanguage,
	isDark,
	translations,
	language,
}: Props) => {
	const [mobileMenuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => {
		setMenuOpen(old => !old);
	};

	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
		document.body.classList.toggle('is-scroll-disabled', mobileMenuOpen);
		return () => {
			document.body.classList.remove('is-scroll-disabled');
		};
	}, [mobileMenuOpen]);

	useEffect(() => {
		setMenuOpen(false);
	}, [location.pathname]);

	return (
		<>
			<motion.header
				className='fixed left-1/2 top-0 z-999 flex w-full -translate-x-1/2 items-center gap-2 border-b border-zinc-900/10 bg-white/60 p-2 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 sm:top-4 sm:w-[calc(100%-2rem)] sm:max-w-3xl sm:rounded-3xl sm:border'
				initial={{ opacity: 0, y: -12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 260, damping: 24 }}
			>
				<ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
				<nav className='hidden flex-1 items-center gap-2 sm:flex'>
					<Link
						to={'/'}
						className={classNames(
							'rounded-full px-3 py-2 text-sm leading-5 text-zinc-900 transition-colors hover:bg-black/10 dark:text-zinc-50 dark:hover:bg-white/10',
							{
								'bg-black/10 dark:bg-white/10': location.pathname === '/',
							},
						)}
					>
						{translations[language].header.home}
					</Link>
					<Link
						to={'/portfolio'}
						className={classNames(
							'rounded-full px-3 py-2 text-sm leading-5 text-zinc-900 transition-colors hover:bg-black/10 dark:text-zinc-50 dark:hover:bg-white/10',
							{
								'bg-black/10 dark:bg-white/10':
									location.pathname === '/portfolio',
							},
						)}
					>
						{translations[language].header.portfolio}
					</Link>
					<Link
						to={'/contact'}
						className={classNames(
							'rounded-full px-3 py-2 text-sm leading-5 text-zinc-900 transition-colors hover:bg-black/10 dark:text-zinc-50 dark:hover:bg-white/10',
							{
								'bg-black/10 dark:bg-white/10': location.pathname === '/contact',
							},
						)}
					>
						{translations[language].header.contact}
					</Link>
				</nav>

				<div className='hidden items-center gap-2 sm:flex'>
					<LinkButton
						href='https://github.com/mescyura'
						icon={
							<SiGithub className='h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50' />
						}
					/>

					<LinkButton
						href='https://linkedin.com/in/yura-holyda'
						icon={
							<SiLinkedin className='h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50' />
						}
					/>

					<LinkButton
						href='mailto:mescyura@gmail.com'
						icon={
							<FiMail className='h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50' />
						}
					/>
					<LinkButton
						href='https://open.spotify.com/user/22qkxjh5ijs7r7iv3mlp4jhda?si=44b206c0372b4a84'
						icon={<SiSpotify className='h-5 w-5 text-[#1db954]' />}
					/>
				</div>

				<div className='ml-auto flex items-center justify-center sm:hidden'>
					<button
						onClick={toggleMenu}
						className='flex h-9 w-9 items-center justify-center text-zinc-900 dark:text-zinc-50'
						aria-label='mobile menu button'
					>
						{!mobileMenuOpen ? (
							<HiMenu className='h-7 w-7' />
						) : (
							<HiX className='h-7 w-7' />
						)}
					</button>
				</div>

				<LanguageToggle toggleLanguage={toggleLanguage} language={language} />
			</motion.header>
			<AnimatePresence>
				{mobileMenuOpen && (
					<>
						<motion.div
							key='NavBackdrop'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1, ease: 'easeInOut' }}
							className='fixed left-0 top-14 z-500 flex h-dvh w-full flex-col items-center overflow-hidden bg-black/10 backdrop-blur-lg'
							onClick={() => setMenuOpen(false)}
						/>

						<motion.div
							key='NavMenu'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className='fixed left-0 top-14 z-700 flex w-full flex-col items-center bg-white dark:bg-zinc-950'
							onClick={e => e.stopPropagation()}
						>
							<div className='flex w-full flex-col'>
								<MobileLandingButton
									name={translations[language].header.home}
									link='/'
									selected={location.pathname === '/'}
									onClick={() => setMenuOpen(false)}
								/>
								<MobileLandingButton
									name={translations[language].header.portfolio}
									link='/portfolio'
									selected={location.pathname === '/portfolio'}
									onClick={() => setMenuOpen(false)}
								/>
								<MobileLandingButton
									name={translations[language].header.contact}
									link='/contact'
									selected={location.pathname === '/contact'}
									onClick={() => setMenuOpen(false)}
								/>
							</div>

							<div className='flex items-center gap-2 py-2'>
								<LinkButton
									href='https://github.com/mescyura'
									icon={
										<SiGithub className='h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50' />
									}
									onClick={() => setMenuOpen(false)}
								/>

								<LinkButton
									href='https://linkedin.com/in/yura-holyda'
									icon={
										<SiLinkedin className='h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50' />
									}
									onClick={() => setMenuOpen(false)}
								/>

								<LinkButton
									href='mailto:mescyura@gmail.com'
									icon={
										<FiMail className='h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50' />
									}
									onClick={() => setMenuOpen(false)}
								/>
								<LinkButton
									href='https://open.spotify.com/user/22qkxjh5ijs7r7iv3mlp4jhda?si=44b206c0372b4a84'
									icon={<SiSpotify className='h-5 w-5 text-[#1db954]' />}
									onClick={() => setMenuOpen(false)}
								/>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
