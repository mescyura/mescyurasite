import { Translations } from '../../interfaces';
import classes from './ThemeToggle.module.css';

interface Props {
	toggleTheme: () => void;
	isDark: boolean;
	translations: Translations;
	language: string;
}

export const ThemeToggle = ({
	toggleTheme,
	isDark,
	translations,
	language,
}: Props) => {
	return (
		<button className={classes.themeToggle} onClick={toggleTheme}>
			{isDark
				? translations[language].lightMode
				: translations[language].darkMode}
		</button>
	);
};
