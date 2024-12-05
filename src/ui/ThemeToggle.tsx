import { Translations } from '../App';

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
		<button className='theme-toggle' onClick={toggleTheme}>
			{isDark
				? translations[language].lightMode
				: translations[language].darkMode}
		</button>
	);
};
