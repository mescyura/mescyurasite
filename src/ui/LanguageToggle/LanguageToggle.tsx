import classes from './LanguageToggle.module.css';

interface Props {
	toggleLanguage: () => void;
	language: string;
}

export const LanguageToggle = ({ toggleLanguage, language }: Props) => {
	return (
		<button
			className={classes.languageToggle}
			onClick={toggleLanguage}
			aria-label='language button'
		>
			{language.toUpperCase()}
		</button>
	);
};
