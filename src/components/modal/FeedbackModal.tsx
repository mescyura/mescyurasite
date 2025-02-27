import { Translations } from '../../interfaces';
import classes from './FeedbackModal.module.css';

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
	<div className={`${classes.feedbackModal} ${type}`}>
		<h3>{translations[language][type]}</h3>
		<p>
			{type === 'success'
				? translations[language].allGood
				: translations[language].tryAgain}
		</p>
		<button onClick={onClose}>{translations[language].ok}</button>
	</div>
);
