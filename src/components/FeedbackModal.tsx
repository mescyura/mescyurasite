import { Translations } from '../App';

interface Props {
	type: 'success' | 'error';
	onClose: () => void;
	translations: Translations;
	language: string;
}

export const FeedbackModal = ({
	type,

	onClose,
	translations,
	language,
}: Props) => (
	<div className={`feedback-modal ${type}`}>
		<h3>{translations[language][type]}</h3>
		<p>
			{type === 'success'
				? translations[language].allGood
				: translations[language].tryAgain}
		</p>
		<button onClick={onClose}>{translations[language].ok}</button>
	</div>
);
