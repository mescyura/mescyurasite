import { SocialItems } from '../../interfaces';

import data from '../../data/data.json';
import classes from './SocialLink.module.css';

export const SocialLinks = () => {
	const socialItems: SocialItems[] = data.socialLinks;

	return (
		<div className={classes.socialLinks}>
			{socialItems.map(link => (
				<a
					key={link.href}
					href={link.href}
					target='_blank'
					rel='noopener noreferrer'
				>
					<i className={`fab fa-${link.icon}`}></i>
				</a>
			))}
		</div>
	);
};
