import { ReactElement } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import classes from './ContactLink.module.css';

import { Link } from 'react-router-dom';

const ContactLink = ({
	name,
	icon,
	link,
}: {
	name: string;
	icon: ReactElement;
	link: string;
}) => {
	return (
		<Link to={link} className={classes.contact_link}>
			{icon}
			<h1>{name}</h1>
			<FiExternalLink />
		</Link>
	);
};

export default ContactLink;
