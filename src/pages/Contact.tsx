// import Message from '../components/message/Message';
import TimeStatus from '../components/timeStatus/TimeStatus';
import { Translations } from '../interfaces';
import classes from './Contact.module.css';

interface Props {
	translations: Translations;
	language: string;
}

export const Contact = ({ translations, language }: Props) => {
	return (
		<section className={classes.hero}>
			<div className={classes.profile}>
				<h1>{translations[language].chat} 💬</h1>
			</div>
			<p className={classes.subtitle}>{translations[language].chat_info}</p>
			<TimeStatus translations={translations} language={language} />
			{/* <Message /> */}
		</section>
	);
};
