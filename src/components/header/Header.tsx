import { Translations } from '../../interfaces';

import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle';
import { LanguageToggle } from '../../ui/LanguageToggle/LanguageToggle';
import { Link, useLocation } from 'react-router-dom';

import classes from './Header.module.css';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';
import { useState } from 'react';
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
			className={classNames(classes.mobile_menu_content_link, {
				[classes.active]: selected,
			})}
			onClick={onClick}
		>
			{name}
		</Link>
	);
};

interface LinkProps {
	href: string;
	icon: JSX.Element;
}

const LinkButton = ({ icon, href }: LinkProps) => {
	return (
		<a
			className={classes.social_btn}
			target='_blank'
			rel='noreferrer'
			aria-label={href}
			href={href}
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

	// useEffect(() => {
	// 	if (typeof window === 'undefined') {
	// 		return;
	// 	}

	// 	void new Audio('/pop.mp3').play().catch(() => null);
	// }, [location.pathname]);

	return (
		<>
			<header className={classes.header}>
				<ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
				<nav className={classes.nav}>
					<Link
						to={'/'}
						className={location.pathname === '/' ? classes.active : ''}
					>
						{translations[language].header.home}
					</Link>
					<Link
						to={'/portfolio'}
						className={location.pathname === '/portfolio' ? classes.active : ''}
					>
						{translations[language].header.portfolio}
					</Link>
					<Link
						to={'/contact'}
						className={location.pathname === '/contact' ? classes.active : ''}
					>
						{translations[language].header.contact}
					</Link>
				</nav>

				<div className={classes.social}>
					<LinkButton
						href='https://github.com/mescyura'
						icon={<SiGithub className={classes.social_icon} />}
					/>

					<LinkButton
						href='https://linkedin.com/in/yura-holyda'
						icon={<SiLinkedin className={classes.social_icon} />}
					/>

					<LinkButton
						href='mailto:mescyura@gmail.com'
						icon={<FiMail href='' className={classes.social_icon} />}
					/>
				</div>

				<div className={classes.mobile_menu}>
					<button onClick={toggleMenu} className={classes.mobile_menu_btn}>
						{!mobileMenuOpen ? (
							<HiMenu className={classes.mobile_menu_btn_icon} />
						) : (
							<HiX className={classes.mobile_menu_btn_icon} />
						)}
					</button>
				</div>

				<LanguageToggle toggleLanguage={toggleLanguage} language={language} />
			</header>
			<AnimatePresence>
				{mobileMenuOpen && (
					<>
						<motion.div
							key='NavBackdrop'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1, ease: 'easeInOut' }}
							className={classes.backdrop_wrapper}
						/>

						<motion.div
							key='NavMenu'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.1, ease: 'easeInOut' }}
							className={classes.backdrop}
						>
							<div className={classes.mobile_menu_content}>
								<MobileLandingButton
									name='Home'
									link='/'
									selected={location.pathname === '/'}
									onClick={() => setMenuOpen(false)}
								/>
								<MobileLandingButton
									name='Portfolio'
									link='/portfolio'
									selected={location.pathname === '/portfolio'}
									onClick={() => setMenuOpen(false)}
								/>
								<MobileLandingButton
									name='Contact'
									link='/contact'
									selected={location.pathname === '/contact'}
									onClick={() => setMenuOpen(false)}
								/>
							</div>

							<div className={classes.mobile_menu_content_social}>
								<LinkButton
									href='https://github.com/mescyura'
									icon={<SiGithub className={classes.social_icon} />}
								/>

								<LinkButton
									href='https://linkedin.com/in/yura-holyda'
									icon={<SiLinkedin className={classes.social_icon} />}
								/>

								<LinkButton
									href='mailto:mescyura@gmail.com'
									icon={<FiMail href='' className={classes.social_icon} />}
								/>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};
