interface Props {
	toggleLanguage: () => void;
	language: string;
}

export const LanguageToggle = ({ toggleLanguage, language }: Props) => {
	return (
		<button className='language-toggle' onClick={toggleLanguage}>
			{language.toUpperCase()}
		</button>
	);
};
