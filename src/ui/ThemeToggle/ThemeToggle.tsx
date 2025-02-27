import { FiMoon, FiSun } from 'react-icons/fi';
import classes from './ThemeToggle.module.css';

interface Props {
	toggleTheme: () => void;
	isDark: boolean;
}

export const ThemeToggle = ({ toggleTheme, isDark }: Props) => {
	return (
		<button className={classes.themeToggle} onClick={toggleTheme}>
			{/* {isDark
				? translations[language].lightMode
				: translations[language].darkMode} */}
			{isDark ? (
				<FiSun className='text-black w-6 h-6 xs:w-5 xs:h-5' />
			) : (
				<FiMoon className='text-white w-6 h-6 xs:w-5 xs:h-5' />
			)}
		</button>
	);
};
