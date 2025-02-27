import { Translations } from '../../interfaces';

import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle';
import { LanguageToggle } from '../../ui/LanguageToggle/LanguageToggle';
import { Link, useLocation } from 'react-router-dom';

import classes from './Header.module.css';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

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
	const location = useLocation();
	console.log(location.pathname);

	return (
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

			<LanguageToggle toggleLanguage={toggleLanguage} language={language} />
		</header>
	);
};
