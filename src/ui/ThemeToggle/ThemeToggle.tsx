import { FiMoon, FiSun } from 'react-icons/fi';

interface Props {
	toggleTheme: () => void;
	isDark: boolean;
}

export const ThemeToggle = ({ toggleTheme, isDark }: Props) => {
	return (
		<button
			className='flex select-none items-center justify-center rounded-full p-2 text-zinc-900 transition-colors hover:bg-black/10 dark:text-zinc-50 dark:hover:bg-white/10'
			onClick={toggleTheme}
			aria-label='theme button'
		>
			{/* {isDark
				? translations[language].lightMode
				: translations[language].darkMode} */}
			{isDark ? (
				<FiSun className='h-5 w-5' />
			) : (
				<FiMoon className='h-5 w-5' />
			)}
		</button>
	);
};
