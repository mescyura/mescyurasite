import { Translations } from '../../interfaces';
import { Spotify } from '../spotify/Spotify';
import classes from './Footer.module.css';

const date = new Date();

interface Props {
	translations: Translations;
	language: string;
}

const Footer = ({ translations, language }: Props) => {
	return (
		<div className={classes.footer}>
			<div className={classes.text}>
				<h1>Yurii Holyda</h1>
				<h2>Frontend Developer • {date.getFullYear()}</h2>
			</div>
			<Spotify translations={translations} language={language} />
		</div>
	);
};

export default Footer;
