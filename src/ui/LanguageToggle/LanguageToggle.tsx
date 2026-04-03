interface Props {
	toggleLanguage: () => void;
	language: string;
}

export const LanguageToggle = ({ toggleLanguage, language }: Props) => {
	return (
		<button
			className='min-w-10 select-none rounded-full p-2 text-sm leading-5 text-zinc-900 transition-colors hover:bg-black/10 dark:text-zinc-50 dark:hover:bg-white/10'
			onClick={toggleLanguage}
			aria-label='language button'
		>
			{language.toUpperCase()}
		</button>
	);
};
