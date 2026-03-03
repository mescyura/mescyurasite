import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';
import { Translations } from '../interfaces';

interface Props {
	translations: Translations;
	language: string;
}

export const NotFound = ({ translations, language }: Props) => {
	return (
		<section className={classes.hero}>
			<div className={classes.content}>
				<h1 className={classes.code}>404</h1>
				<div className={classes.textBlock}>
					<h1 className={classes.title}>
						{translations[language].not_found.title}
					</h1>
					<p className={classes.subtitle}>
						{translations[language].not_found.subtitle}
					</p>
					<div className={classes.actions}>
						<Link to='/' className={classes.primaryButton}>
							{translations[language].not_found.back_to_home}
						</Link>
						<button
							type='button'
							className={classes.secondaryButton}
							onClick={() => window.history.back()}
						>
							{translations[language].not_found.go_back}
						</button>
					</div>
				</div>
			</div>
			<div aria-hidden='true' className={classes.orbit} />
			<div aria-hidden='true' className={classes.orbitSecondary} />
		</section>
	);
};
