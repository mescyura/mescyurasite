import { Translations } from '../../interfaces';

import { ThemeToggle } from '../../ui/ThemeToggle/ThemeToggle';
import { LanguageToggle } from '../../ui/LanguageToggle/LanguageToggle';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

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
	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<Link to={'/'}>Home</Link>
				<Link to={'/about'}>About</Link>
				<Link to={'/services'}>Services</Link>
				<Link to={'/reviews'}>Reviews</Link>
				<Link to={'/portfolio'}>Portfolio</Link>

				<Link to={'/not-found'}>404</Link>
			</nav>
			<ThemeToggle
				toggleTheme={toggleTheme}
				isDark={isDark}
				translations={translations}
				language={language}
			/>
			<LanguageToggle toggleLanguage={toggleLanguage} language={language} />
		</header>
	);
};
